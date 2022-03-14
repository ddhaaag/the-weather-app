import React from 'react';
import {Weather} from './components/Weather';

function App() {

  return (
    <>
      <header className="header">
        <h1>The weather app</h1>
      </header>
      <main>
        <Weather />
      </main>
    </>
  );
}

export default App;
