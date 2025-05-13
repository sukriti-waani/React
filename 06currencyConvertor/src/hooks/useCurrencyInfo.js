import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  // This useEffect hook will run when the component mounts or when the currency value change
  useEffect(() => {
    fetch(
  `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.min.json`
)

      .then((res) => res.json()) // Converts the raw HTTP response into a JavaScript object (JSON)
      .then((res) => setData(res[currency])); //The JSON object returned by the API
  }, [currency]); //  This makes the useEffect re-run every time currency changes. So when a user switches the base currency, new data is fetched accordingly.
  console.log(data);
  return data; // To make this hook functional, we should return the data
}

export default useCurrencyInfo; //     Exports the useCurrencyInfo hook so it can be imported and used in other components.
