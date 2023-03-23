import React, { useState } from 'react';
import Dashboard from './Dashboard';
import FormCreate from './FormCreate';
import Reports from './Reports';

const Home = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const handleClick = (componentName: React.SetStateAction<string>) => {
    setActiveComponent(componentName);
  };

  return (
    <div style={{'background' : 'black'}}>
      <nav>
        <button onClick={() => handleClick('dashboard')}>1</button>
        <button onClick={() => handleClick('formCreate')}>2</button>
        <button onClick={() => handleClick('Reports')}>3</button>
      </nav>
      {activeComponent === 'dashboard' && <Dashboard />}
      {activeComponent === 'formCreate' && <FormCreate />}
      {activeComponent === 'Reports' && <Reports />}
    </div>
  );
};

export default Home;
