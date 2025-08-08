import { useState, useCallback, useEffect, useRef } from "react";



function App() {
  const [len, setLen]=useState(8);
  const [num, setNum]=useState(false);
  const [char, setChar]=useState(false);
  const [password, setPassword]=useState("");

  const passRef=useRef(null);

  const passwordGenerator=useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str+="0123456789"
    if(char) str+="!@#$%^&(){}[]:<>?,./|";

    for(let i=0; i<len; i++) {
      let char=Math.floor(Math.random()*str.length);

      pass+=str.charAt(char);
    }

    setPassword(pass);

  }, [len, num, char, setPassword]);

  const copyToClipboard=useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]);

  useEffect(() => {passwordGenerator()}, [len, num, char, setPassword]);


  return (
    <>
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="w-150 h-40 shadow-md rounded-lg my-8 px-5 bg-slate-800 flex flex-col justify-center items-center">
        
        <div className="flex rounded-2xl w-full h-15 bg-slate-500 text-3xl m-6">

          <input 
          type="text" 
          ref={passRef}
          value={password} 
          className="outline-0 w-full mx-6" 
          placeholder="Password" 
          readOnly/>
          
          <button 
          onClick={copyToClipboard}
          className="outline-0 bg-sky-950 flex justify-center items-center rounded-r-2xl">
          Copy</button>
        </div>

        <div className="">
          <input
          type="range"
          min={6}
          max={50}
          value={len}
          className="cursor-pointer m-2"
          onChange={(e) => {setLen(e.target.value)}}
          />
          <label className="text-amber-100 text-md font-bold">Length: {len}</label>

          <input
          type="checkbox"
          defaultChecked={num}
          className="cursor-pointer m-3"
          onChange={(e) => {setNum(prev => !prev)}}
          />
          <label className="text-amber-100 text-md font-bold">Num Allowed</label>

          <input
          type="checkbox"
          defaultChecked={char}
          className="cursor-pointer m-3"
          onChange={(e) => {setChar(prev => !prev)}}
          />
          <label className="text-amber-100 text-md font-bold">Char Allowed</label>
        </div>
      </div>
    </>
  )
}



export default App
