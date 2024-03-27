// CurrencyContext.js

import  { createContext, useState } from 'react';

// Create a context
export const CurrencyContext = createContext();

// Create a provider component
export const CurrencyProvider = ({ children }) => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [amount, setAmount] = useState(''); // Add state for amount
  
    return (
      <CurrencyContext.Provider
        value={{
          fromCurrency,
          toCurrency,
          exchangeRate,
          amount, // Provide amount state
          setFromCurrency,
          setToCurrency,
          setExchangeRate,
          setAmount // Provide setAmount function
        }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  };