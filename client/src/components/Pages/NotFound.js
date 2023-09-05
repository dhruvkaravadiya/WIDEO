import React, { useEffect } from 'react';
import RobotGif from '../../assets/images/404 Robot.gif'
const NotFound = () => {
  const clearAndNavigateHome = () => {
      onHomePageClick();
  }
  return (
    <div className="flex flex-col gap-5 mt-14 justify-center bg-indigo text-white">
      <img src = {RobotGif} className='self-center rounded-2xl' alt="not found" width={300} height={300}/>
      <button onClick={clearAndNavigateHome} className='px-5 py-3 bg-[#24324b] hover:bg-[#30415e] rounded-md border-skyblue mt-3 text-sm font-montserrat w-max self-center'>
        Home Page
      </button>
    </div>
  );
};
export default NotFound;