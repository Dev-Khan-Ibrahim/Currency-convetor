// App.jsx

import './App.css';
import Converter from './Component/Converter';
import { CurrencyProvider } from './Component/CurrencyProvider';

function App() {
  return (
    <CurrencyProvider>
      <div className="App">
        <header>
          <h1>Currency Converter</h1>
        </header>
        <Converter/>
      </div>
    </CurrencyProvider>
  );
}

export default App;
