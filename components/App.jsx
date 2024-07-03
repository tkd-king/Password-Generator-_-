"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowd, setNumberAllowd] = useState(false);
  const [charAllowd, setCharAllowd] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowd) str += "0123456789";
    if (charAllowd) str += "!@#$%^&*()_+=-[]{}";
    //yaha ^ prmery mistake thy k mn charAllowd ky jaga 
    //setCharAllowd likh raha tha ya mn ghalty dobara nahe karo ga

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowd, charAllowd, setPassword]);
  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100) 
  window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowd, numberAllowd, passwordGenerator]);
  return (
    <div className="w-full py-6 shadow-md rounded-lg px-8 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="flex shsdow-md rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none py-1 px-3 w-full"
          readOnly
          placeholder="password"
          ref={passwordRef}
        />
        <button className="outline-none bg-blue-700 text-white px-5 py-0.5 shrink-0"
        onClick={copyPasswordToClipBoard}
        >
          copy
        </button>
      </div>
      <div className="flex gap-x-2 text-sm ">
        <div className="flex items-cneter gap-x-1">
          <input
            className="cursor-pointer"
            value={length}
            min={8}
            max={100}
            type="range"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>length: {length}</label>
        </div>
        <div className="flex gap-x-1 items-center">
          <input
            id="numberinput"
            onChange={() => {
              setNumberAllowd((prev) => !prev);
            }}
            type="checkbox"
          />
          <label htmlFor="numberid">Number</label>
        </div>
        <div className="flex gap-x-1 items-center">
          <input
            id="characktorinput"
            onChange={() => {
                setCharAllowd((prev)=>!prev);
            }}
            type="checkbox"
          />
          <label htmlFor="numberid">Charactor</label>
        </div>
      </div>
    </div>
  );
}

export default App;
