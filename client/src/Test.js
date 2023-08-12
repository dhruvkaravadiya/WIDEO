import React, { useEffect, useState } from 'react';

export default function Test(){
  const [data , setData] = useState([]);

  const fetchData = async () =>{
    try{
      const response = await fetch('http://localhost:3333/api/videos/random')
      console.log(response);
    const videos = await response.json();
    setData(videos);
    console.log(videos);
    }
    catch(error){
      console.error('Error fetching data:', error);
    }
   }

   useEffect(()=>{
    fetchData();
   },[]);
  return (<>
    <h1>hello</h1>
    <div>
      {data.map((video)=>{
        return (<h1>{video.title}</h1>);
        
      })}
    </div>
    </>
  );
};
