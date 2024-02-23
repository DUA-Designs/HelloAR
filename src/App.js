import { useEffect, useState } from "react";
import {   puppy,v1,v2,v3,v4,v5  } from "./media";

 
 
const myMedia=[v1,v2,v3,v4,v5];
function App() {
  const [page1,setPage1]=useState(true);
   

async function  hanleMainContent(){
  console.log("Is this working?");
    setPage1(false);
    await new Promise(resolve=>setTimeout(()=>resolve("This is for loading time"),500));
     document.getElementById("mainContent").classList.add("showMe");
    
  }
    function asyncRendering(){

   
   
    if(document.readyState && page1){
      document.getElementById("start").classList.add("showMe"); 
     
    }
    
  }
  function handlePlay(type,ind){
      if(type==="down"){
        document.querySelector(`.myVideos:nth-child(${ind+1})`).pause();
      }
      else{
        document.querySelector(`.myVideos:nth-child(${ind+1})`).play();
      }
  }
 
  useEffect(()=>{
   asyncRendering();
   
  
  } );
  

  return (
    <div className=" container-fluid" id="rootChild">
      {page1?<div className="  text-center text-white d-grid align-items-center" style={{height:"100vh"}}>
         <h1>Hello AR. Welcome to my shorts App.</h1>
        <div className="  my-3 mx-auto " id="puppyContainer"><img src={puppy}  className="img-fluid" alt="puppy_Image"  id="puppy"></img></div>
         <div className="col-12"><button id="start" className="btn btn-light col-lg-2 col-md-3 col-sm-12 col-xs-12 mx-auto  my-3" onClick={hanleMainContent}>Start</button> </div>
        </div>: 
     <div   id="mainContent" className="">
      
                
                  
                    {myMedia.map((item,index)=><div className="videoContainer"><video className="  myVideos mx-auto rounded  " autoPlay   key={index} loop onMouseDown={()=>handlePlay("down",index )} onMouseUp={()=>handlePlay("up",index)}><source src={item}  type="video/mp4"></source></video></div>)}
                 
               
                        
      </div>}
    </div>
  );
}

export default App;
