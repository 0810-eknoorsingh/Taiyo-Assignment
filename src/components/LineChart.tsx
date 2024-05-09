import React from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface ChartData {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
}
const LineChart: React.FC = () => {
const { data, isLoading, error } = useQuery<ChartData, Error>({
    queryKey: ['chartData'],
    queryFn: async () => {
      const response = await axios.get<ChartData>('https://disease.sh/v3/covid-19/all');
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const chartData = {
    labels: Object.keys(data!.cases),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(data!.cases),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Deaths',
        data: Object.values(data!.deaths),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Recovered',
        data: Object.values(data!.recovered),
        fill: false,
        borderColor: 'rgba(54,162,235,1)',
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cases Fluctuations</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;