import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface IChartDetails {}

const ChartDetails = (props: IChartDetails) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e: any) => {
        navigate('detail');
      }}
    >
      ChartDetails
    </div>
  );
};

export default ChartDetails;
