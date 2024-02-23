import { useEffect, useState } from "react";
import {   puppy,v1,v2,v3,v4,v5,v6,v7,v8  } from "./media";

 
 
const myMedia=[v1,v2,v3,v4,v5,v6,v7,v8];
function App() {
  const [page1,setPage1]=useState(true);
  const [likes,setLikes]=useState([0,0,0,0,0,0,0,0]);
  const [clicked,setClicked]=useState([false,false,false,false,false,false,false,false]);
  const [current,setCurrent]=useState(null);
  const [videos,setVideos]=useState("");
  const [scrollDirection,setScrollDirection]=useState(0);
   
   

async function  hanleMainContent(){
   
    setPage1(false);
    await new Promise(resolve=>setTimeout(()=>resolve("This is for loading time"),500));
     document.getElementById("mainContent").classList.add("showMe");
     await new Promise(resolve=>setTimeout(()=>resolve("This is for loading time"),1000));
     setVideos(document.querySelectorAll(".myVideos"));
     await new Promise(resolve=>setTimeout(()=>resolve("This is for loading time"),500));
    setCurrent(0);
   
    
  }
    function asyncRendering(){

   
   
    if(document.readyState && page1){
      document.getElementById("start").classList.add("showMe"); 
    
     
    }
     if(!page1){
      for(let i=0;i<8; i++){
        if(i===current){
          videos[i].play();
        }
        else{
          videos[i].pause();
          videos[i].currentTime=0;
        }
      }
     }
    
  }
  function handleLikes(ind){
    let curr=likes;
    let currClicked=clicked;
    if(!clicked[ind]){
    curr[ind]+=1;
  
    }
    else{
      curr[ind]-=1;
    }
    currClicked[ind]=!currClicked[ind];
    setClicked([...currClicked]);
    setLikes([...curr]);

  }
    function handleDeskNav(direction,type){
    console.log(direction);
    
     if(current>0 && direction==="up"){
      if(type==="normal"){videos[current-1].scrollIntoView({behavior:"smooth"});}
       setCurrent(current-1);
     }
     if(current<7 && direction==="down"){
       if(type==="normal"){videos[current+1].scrollIntoView({behavior:"smooth"});}
       
      setCurrent(current+1);
     }
   
     
  }
 
 
  useEffect(()=>{
   asyncRendering();
  

   
  
  },[current] );

  
  

  return (
    <div   id="rootChild">
      
      {page1?<div className="  text-center   d-grid align-items-center" style={{height:"100vh"}}>
         <h1>Hello AR. Welcome to my shorts App.</h1>
        <div className="  my-3 mx-auto " id="puppyContainer"><img src={puppy}  className="img-fluid" alt="puppy_Image"  id="puppy"></img></div>
         <button id="start" className="btn btn-dark col-10 col-lg-3 col-md-3 col-sm-10  mx-auto  my-3" onClick={hanleMainContent}>Start</button>  
        </div>: 
     <div   id="mainContent" >      <div  className="desktopNavigation"><button className="btn btn-dark"  onClick={()=>handleDeskNav("up","normal")}><i class="fa-solid fa-up-long"></i></button><button className="btn btn-dark" onClick={()=>handleDeskNav("down","normal")}><i class="fa-solid fa-down-long"></i></button></div>
       

                  
                    {myMedia.map((item,index)=><div className="videoContainer" key={index}>
                      <div className="position-relative  mx-auto "><video className="  myVideos mx-auto rounded d-flex" controls       loop > <source src={item}  type="video/mp4"></source>
                      Your browser does not support the video tag.</video>
                      <div className="feedback "><button className="btn btn-dark rounded-circle my-2  " onClick={()=>handleLikes(index)}>{clicked[index]? <i className="fi fi-ss-social-network"></i>:<i className="fi fi-rs-social-network"></i>}</button>
                          <p>{likes[index]}</p>
                          
                       </div>
                       <div className="title"><h4><i class="fa-solid fa-user"></i> @Video{index+1}</h4></div>
                      </div>

                    </div>)}
                    
                 
               
                        
      </div>}
    </div>
  );
}

export default App;
