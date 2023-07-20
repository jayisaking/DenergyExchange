import React from 'react';
import Send from './Send';
import Sign from './Sign';
import Confirm from './Confirm';
import Burn from './Burn';

const App = () => {
  return (
    <div className="container mx-auto pt-6">
      <div className="flex flex-wrap justify-evenly">
        <div className="w-2/5">
          <Send />
        </div>
        <div className="w-2/5">
          <Sign />
        </div>
        <div className="w-2/5">
          <Confirm />
        </div>
        <div className="w-2/5">
          <Burn />
        </div>
      </div>
    </div>
  );
};

export default App;


