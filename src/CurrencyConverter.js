import './Currency.css';
import CurrencyInput from "./CurrencyInput";
import { useState, useEffect } from "react";
import axios from "axios";

function CurrencyConverter() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('');
  const [currency2, setCurrency2] = useState('');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get('http://data.fixer.io/api/latest?access_key=04caaeba91ef3030d490317c7f4de7b3')
      .then(response => {
        setRates(response.data.rates);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  const conversionText = `${amount1} ${currency1} is equivalent to ${amount2} ${currency2}`;

  return (
    <div className="currencybody">
      <h1 className="currencyheader">Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
      <p className="conversion-text">{conversionText}</p>
    </div>
  );
}

export default CurrencyConverter;
    