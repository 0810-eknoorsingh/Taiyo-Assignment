import React from 'react';
import LineChart from '../components/LineChart';
import MapView from '../components/MapView';

const ChartsAndMapsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Charts and Maps</h1>
      <div className="mb-8">
        <LineChart />
      </div>
      <div>
        <MapView />
      </div>
    </div>
  );
};

export default ChartsAndMapsPage;