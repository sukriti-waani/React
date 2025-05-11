import { useState } from "react";
import "./App.css";
// import Chat from  './components/Chat'

function App() {
  let myObj = {
    username: "Suk",
    age: 19,
  };

  let newArr = [1, 2, 3];

  return (
    <>
      <h1 className="bg-green-400 text-black p-4 rounded-xl">Tailwind Test</h1>
      <Chat username="cardd" btnText="click me" />
      <Chat username="suk" btnText="visit me" />
    </>
  );
}

export default App;
