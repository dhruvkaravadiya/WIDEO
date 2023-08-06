import React from 'react';
const NotFound = () => {
  return (
    <div className="flex flex-col gap-5 justify-center w-screen h-screen bg-indigo text-white">
      <span className="text-9xl self-center text-skyblue font-montserrat ">404</span>
      <p className="text-xl font-semibold text-center px-6">Oops! The page you are looking for doesn't exist.</p>
      <button className='px-5 py-3 border border-3 bg-transparent rounded-md border-skyblue text-skyblue mt-3 font-bold font-roboto-500 w-max self-center'>
        Home Page
      </button>
    </div>
  );
};
export default NotFound;