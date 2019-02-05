import React from 'react';

const Tab = () => {
  return (
    <div className="tabs">
      <div className="tab tab-active">
        <p>Today</p>
      </div>
      <div className="tab tab-inactive">
        <p>Week</p>
      </div>
    </div>
  )
};

export default Tab;