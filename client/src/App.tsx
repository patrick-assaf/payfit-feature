import React from 'react';
import './Style.css';
import { Message } from './Components/Message';
import { Dashboard } from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard />
        <Message />
      </header>
    </div>
  );
}

export default App;
