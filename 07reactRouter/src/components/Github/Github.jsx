import React, { useEffect, useState } from "react";
import ph from "./ph.jpeg";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData()
  const [userData, setUserData] = useState(null); // <-- Store fetched data

  useEffect(() => {
    fetch("https://api.github.com/users/sukriti-waani")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
      });
  }, []);

  return (
    <div className="text-center m-4 bg-gray-400 text-white p-4 text-3xl">
      Github followers: {userData ? userData.followers : "Loading..."}
      <img
        src={ph}
        alt="Git picture"
        className="mx-auto w-40 h-40 rounded-full"
      />
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/sukriti-waani");
  return response.json();
};
