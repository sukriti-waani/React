import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(15);

  // let counter = 15;

  // const addValue = () => {
  //   counter = counter + 1;
  //   setCounter(counter);
  //   console.log("clicked", counter);
  // };

  const addValue = () => {
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
  }

  const removeValue = () => {
    setCounter(counter - 1);
  };

  return (
    <>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button>
    </>
  );
}

export default App;
