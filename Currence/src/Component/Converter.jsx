import React, { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from './CurrencyProvider';

function Converter() {
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency, amount, setAmount } = useContext(CurrencyContext);
  const [exchangeRate, setExchangeRate] = useState(null);
  const currencies = [
    { code: 'USD', name: 'United States Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound Sterling' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'NOK', name: 'Norwegian Krone' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'ZAR', name: 'South African Rand' },
    { code: 'DKK', name: 'Danish Krone' },
    { code: 'PLN', name: 'Polish Zloty' },
    { code: 'ARS', name: 'Argentine Peso' },
    { code: 'EGP', name: 'Egyptian Pound' },
    { code: 'PHP', name: 'Philippine Peso' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'CZK', name: 'Czech Koruna' },
    { code: 'HUF', name: 'Hungarian Forint' },
    { code: 'TWD', name: 'New Taiwan Dollar' },
    { code: 'AED', name: 'United Arab Emirates Dirham' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'ILS', name: 'Israeli New Shekel' },
    { code: 'CLP', name: 'Chilean Peso' },
    { code: 'PEN', name: 'Peruvian Sol' },
    { code: 'KWD', name: 'Kuwaiti Dinar' },
    { code: 'QAR', name: 'Qatari Riyal' },
    { code: 'CRC', name: 'Costa Rican Colón' },
    { code: 'BDT', name: 'Bangladeshi Taka' },
    // Add more currencies as needed
  ];
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setExchangeRate(null); // Reset exchange rate if error occurs
    }
  };


  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const [convertedAmount, setConvertedAmount] = useState(0);
  
  const handleConvert = () => {
    if (exchangeRate !== null) {
      const converted = amount * exchangeRate;
      setConvertedAmount(converted);
    }
  };

  return (
    <div className="converter">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Amount'
      />
      <label>From:</label>
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>{currency.name}</option>
        ))}
      </select>
      <label>To:</label>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>{currency.name}</option>
        ))}
      </select>
    
      <div className="exchange-rate">
        <h2>Exchange Rate:</h2>
        <p>{exchangeRate !== null ? `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}` : 'Select currencies'}</p>
      </div>
      <button onClick={handleConvert}>Convert</button>
      {convertedAmount !== 0 && (
        <div className="converted-amount">
          <h2>Converted Amount:</h2>
          <p>{`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`}</p>
        </div>
      )}
    </div>
  );
}

export default Converter;
