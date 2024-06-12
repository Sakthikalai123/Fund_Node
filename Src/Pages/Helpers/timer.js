import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
function Timer() {
   const authData = useSelector(state=>state.authData);
 
   const timer = authData.timer;
  
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev)=>prev - 1);
    }, 1000);

    // Clear the timer when the component is unmounted
    return () => clearInterval(timer);
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
const reset = ()=>{setRemainingTime(5*60)}
  return (
    <div style={{width:"100px"}}>
     <button onClick={reset}>reset</button>
      <p>{displayTime}</p>
    </div>
  );
}

export default Timer;
