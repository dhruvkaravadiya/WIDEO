import React from 'react';

export default function VideoPageShimmer() {
  return (
    <div className="mt-14 w-full lg:px-10 sm:px-3 md:px-4">
      <div className="md:w-8/12">
        <div className="mt-4">
          <div className=" h-96 bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="flex flex-row gap-4 items-end my-4 px-2">
            <div className="h-6 w-3/4 bg-white/10 animate-pulse"></div>
            <div className="h-4 w-20 bg-white/10 animate-pulse"></div>
          </div>
          <div className="flex px-2 flex-col md:flex-row sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="flex sm:items-start items-center md:gap-0 gap-3 flex-row md:flex-col sm:flex-row lg:flex-col">
                <div className="h-5 w-20 bg-white/10 animate-pulse"></div>
                <div className="h-4 w-20 bg-white/10 animate-pulse"></div>
              </div>
              <div className="flex justify-end">
                <div className="h-10 w-20 bg-blue-500 rounded-3xl animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-row bg-lightblue1 rounded-3xl">
                <div className="h-10 w-10 bg-white/10 animate-pulse rounded-l-3xl"></div>
                <div className="h-10 w-10 bg-white/10 animate-pulse rounded-r-3xl"></div>
              </div>
              <div className="flex flex-row items-center bg-lightblue1 rounded-3xl">
                <div className="h-10 w-10 bg-white/10 animate-pulse rounded-l-3xl"></div>
                <div className="h-10 w-32 bg-white/10 animate-pulse rounded-r-3xl"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 mx-2">
          
          <div className="h-48 rounded-lg w-full bg-white/10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
