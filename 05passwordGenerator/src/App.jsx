import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // useState hooks to manage local state
  const [length, setLength] = useState(8);               // Password length (default is 8)

  const [numberAllowed, setNumberAllowed] = useState(false); // Include numbers in password

  const [charAllowed, setCharAllowed] = useState(false);     // Include special characters in password

  const [Password, setPassword] = useState("");              // The generated password

  // useRef hook to get direct access to the input element for copying
  const passwordRef = useRef(null);

  /**
   * passwordGenerator - A function to generate password
   * useCallback is used to memoize the function so that it's not re-created on every render
   */
  const passwordGenerator = useCallback(() => {
    let pass = "";  // Variable to store the generated password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Basic letters

    // Add numbers if allowed
    if (numberAllowed) {
      str += "0123456789";
    }

    // Add special characters if allowed
    if (charAllowed) {
      str += "!@#$%^&*()_+";
    }

    // Generate a random string of the given length
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // Random index
      pass += str.charAt(char); // Append random character
    }

    // Update the password state
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  /**
   * copyPasswordToClipboard - Copies the password to the clipboard
   */
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();                        // Select the password text
    passwordRef.current?.setSelectionRange(0, 999);       // Set selection range (for mobile)
    window.navigator.clipboard.writeText(Password);       // Copy to clipboard
  }, [Password]);

  /**
   * useEffect - Runs the passwordGenerator whenever length, numberAllowed, or charAllowed changes
   */
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  // JSX returned by the component
  return (
    <>
      {/* Container Box */}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-red-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>

        {/* Password display and copy button */}
        <div className='className=" flex shadow rounded-lg overflow-hidden mb-4 "'>
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef} // useRef attached to input
          />

          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>

        {/* Settings section: Range, Numbers, Characters */}
        <div className="flex text-sm gap-x-2">
          {/* Length Slider */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value); // Update password length
              }}
            />
            <label>Length: {length}</label>
          </div>

          {/* Number and Character checkboxes */}
          <div className="flex items-center gap-x-1">
            {/* Toggle Numbers */}
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev); // Toggle state
              }}
            />
            <label htmlFor="numberInput">Numbers</label>

            {/* Toggle Characters */}
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev); // Toggle state
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
