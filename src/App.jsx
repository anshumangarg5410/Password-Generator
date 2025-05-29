import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [num, numallowed] = useState(false);
  const [alpha, alphaallowed] = useState(false);
  const [pass, changepass] = useState("_");

  const passgen = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (num) str += "1234567890";
    if (alpha) str += " !@#$%^&*()-_=+[]{}|,./<>?.";

    for(let i = 0; i<length; i++) {
      let char = Math.floor(Math.random() * str.length)
      password += str.charAt(char);
    }

    changepass(password);

  }) 

  // useEffect(passgen, [length, num, alpha, changepass]);

    const passref = useRef(null)
    
    const copypassword = useCallback(()=>{
      passref.current?.select();
      window.navigator.clipboard.writeText(pass);
    })


  return (
    <>
    <div className="main h-[400px] w-[850px] bg-[rgba(255,255,255,0.1)]  backdrop-blur-md rounded-xl p-6 ">
      <div className="head h-[50px] w-[800px] bg-tranparent rounded-xl border-double font-mono font-extrabold text-white text-2xl flex justify-center items-center">Password Generator</div>
      <div className="container h-[300px] w-[800px] mt-2 rounded-xl border-double border-white flex flex-col">

        <div className="mainbox h-[20%] w-full bg-red-300 rounded-xl">
          <input type='text' ref={passref} className='h-full w-full p-5 outline-none bg-transparent font-bold rounded-xl' value={pass} readOnly ></input>
        </div>

        <div className="editors h-[60%] w-full flex flex-col">
          <div className="slider h-[50%] w-full flex flex-col justify-center text-white">
            <input className='w-full h-[30%] ' type='range' min={8} max={100} onChange={(e)=>{setlength(e.target.value)}} ></input>
            <label className='w-full h-[10%] text-white flex justify-center items-center m-3 font-mono font-bold'>Length: {length}</label>
          </div>
          
          <div className="numsaplha w-full h-[50%] bg-transparent flex flex-col justify-center items-center">
            <div className="num p-2 flex gap-4 font-mono font-bold items-center   "><label className='text-white'> Number Values Allowed? </label><input type='checkbox' defaultChecked={num} onChange={(e) => numallowed(e.target.checked)} className="h-[20px] w-[20px] bg-transparent accent-cyan-400 border-2 border-white rounded"></input> </div>
            <div className="aplha p-2 flex gap-4 font-mono font-bold items-center  "><label className='text-white'> Special Values Allowed? </label><input type='checkbox' defaultChecked={alpha} onChange={(e) => alphaallowed(e.target.checked)} className='h-[20px] w-[20px] bg-transparent accent-cyan-400 border-2 border-white rounded'></input> </div>
          </div>
        </div>

        <div className="btns flex m-5 h-[20%]">
        <button onClick={passgen} className="copybtn h-full w-[50%] rounded-l-xl bg-red-200 flex justify-center items-center font-mono font-extrabold text-lg ">Generate!</button>
        <button onClick={copypassword} className="copybtn h-full w-[50%] rounded-r-xl bg-red-400 flex justify-center items-center font-mono font-extrabold text-lg ">Copy Password</button>
      </div>
      </div> 
    </div>
    </>
  )
}

export default App

