import { useEffect, useState } from "react";
import {  v1,v2,v3,v4,v5,v6,v7,v8  } from "./media";

 
 //an array of imported videos
const myMedia=[v1,v2,v3,v4,v5,v6,v7,v8];

function App() {

  //useful states that will handle the control of functions
  const [page1,setPage1]=useState(true); //takes care of the visibility of welcome page.
  const [likes,setLikes]=useState([0,0,0,0,0,0,0,0]); // state to add up like
  const [dislikes,setDislikes]=useState([0,0,0,0,0,0,0,0]);// state to add up dislike
  const [clicked,setClicked]=useState([false,false,false,false,false,false,false,false]);// state to toggle Like
  const [disClicked,setDisClicked]=useState([false,false,false,false,false,false,false,false]);
  const [current,setCurrent]=useState(null); //state to handle the current video in the viewport
  const [videos,setVideos]=useState(""); // state to just store and utilize all video containers as nodes.
  
  

  //function to make the start button visible and gets triggered continuously to keep the play in check.
  function handleRendering(){
    
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

   
  //asynchronous function that will make the mainContent visible  and initialize necessary state variables
  async function  handleMainContent(){
    
      setPage1(false);
      await new Promise(resolve=>setTimeout(()=>resolve("This is for loading time"),500));//loading time just to stimulate smooth transition
      document.getElementById("mainContent").classList.add("showMe");
      await new Promise(resolve=>setTimeout(()=>resolve("This is for loading time"),1000));
      setVideos(document.querySelectorAll(".myVideos"));
      await new Promise(resolve=>setTimeout(()=>resolve("This is for loading time"),500));
      setCurrent(0);
  }



  //function to handle like and dislike count based on the state of clicked
  function handleLikes(ind,type){
    let currLikes=likes;
    let currClickedLikes=clicked;
    let currDislikes=dislikes;
    let currClickedDislikes=disClicked;
    
      if(type==="like"){
     
        if(!clicked[ind]){
        currLikes[ind]+=1;
        if(currClickedDislikes[ind] && currDislikes[ind]>0){
          currDislikes[ind]-=1;
          currClickedDislikes[ind]=!currClickedDislikes[ind];
          setDislikes([...currDislikes]);
          setDisClicked([...currClickedDislikes]);
        }
        }
        else{
          if(currLikes[ind]>0){currLikes[ind]-=1;}
        }
        currClickedLikes[ind]=!currClickedLikes[ind];
        setClicked([...currClickedLikes]);
        setLikes([...currLikes]);
     }
     else{
      
        if(!disClicked[ind]){
          currDislikes[ind]+=1;
          if(currClickedLikes[ind] && currLikes[ind]>0){
            currLikes[ind]-=1;
            currClickedLikes[ind]=!currClickedLikes[ind];
        setClicked([...currClickedLikes]);
            setLikes([...currLikes]);
          }
          
        }
        else{
          if(currDislikes[ind]>0){currDislikes[ind]-=1;}
        }
        currClickedDislikes[ind]=!currClickedDislikes[ind];
        
        setDisClicked([...currClickedDislikes]);
        setDislikes([...currDislikes]);
    }

  }

  //function that hanldes rigorous navigations.
  function handleDeskNav(direction="",type,event=null){

        if(videos.length===0){ //ensures the function won't run until the states of videos are set.
          return "";
        }
        
        if(event!==null){ //if the event was triggered because of scroll then check the necessary conditions to come up with a movement.
          
          if(event.deltaY<0 &&  Math.abs(event.deltaY)===100){
            direction="up";
          }
          else if(event.deltaY>0 && Math.abs(event.deltaY)===100 ){
            direction="down";
          }
          else{ //false cases to check which video is rending and reset the "current" state.
            for(let i=0;i<8; i++){
              let {top, bottom  }=videos[i].getBoundingClientRect();
              if(((top > 0 && top < window.innerHeight ) ||
              (bottom > 0 && bottom < window.innerHeight)) ){// checks which video is within the viewport
                  setCurrent(i);
                  
                }
            
              
            }
          }
          
        }
         //cases that trigger once the direction has been decided
      if(current>0 && direction==="up"){
        if(type==="normal"){videos[current-1].scrollIntoView({behavior:"smooth"});}
        setCurrent(current-1);
        
      }
      if(current<7 && direction==="down"){
        if(type==="normal"){videos[current+1].scrollIntoView({behavior:"smooth"});}
        
        setCurrent(current+1);
      } 
  }
 
  // this useEffect will trigger whenever the "current" state changes
  useEffect(()=>{
    handleRendering();
   },[current] );


 
  

  return (
    <div   id="rootChild">
      
      {/*conditionally renders different components
       This is the object representation of the layout. 
         mainContent:{desktopNavigation:{buttons},
                      videoContainer:{div:{myVideos,feedback,title,desc}},
                     }
                       

      */
      page1?<div className="  text-center   d-flex flex-column align-items-center justify-content-around" style={{height:"100vh"}}>
         <h1>Hello AR. Welcome to shorts App.</h1>
         <div className="loader"></div>
         <button id="start" className="btn btn-dark col-10 col-lg-3 col-md-3 col-sm-10  mx-auto  my-3" onClick={handleMainContent}>Start</button>  
        </div>: 
              <div   id="mainContent"  onScroll={(event)=>handleDeskNav("","scroll",event )}>
               <div  className="desktopNavigation"><button className="btn btn-dark"  onClick={()=>handleDeskNav("up","normal")}><i className="fa-solid fa-up-long"></i></button><button className="btn btn-dark" onClick={()=>handleDeskNav("down","normal")}><i className="fa-solid fa-down-long"></i></button></div>
                 {myMedia.map((item,index)=>
                     <div className="videoContainer" key={index}>
                       <div className="position-relative  mx-auto "><video className="  myVideos mx-auto rounded d-flex" controls       loop > <source src={item}  type="video/mp4"></source>Your browser does not support the video tag.</video>
                          <div className="feedback "><button className="btn btn-dark rounded-circle my-2  " onClick={()=>handleLikes(index,"like")}>{clicked[index]? <i className="fi fi-ss-social-network"></i>:<i className="fi fi-rs-social-network"></i>}</button>
                            <p>{likes[index]}</p>
                            <button className="btn btn-dark rounded-circle my-2" onClick={()=>handleLikes(index,"dislike")}>{disClicked[index]?<i className="fi fi-ss-hand"></i>:<i className="fi fi-rs-hand"></i>}</button>
                            <p>{dislikes[index]}</p>
                          </div>
                          <div className="title rounded p-1"><h3><i className="fa-solid fa-user"></i> @Video{index+1}</h3></div>
                          <div className="desc rounded p-1"><h4>This is video{index+1}</h4></div>
                       </div>
                     </div>)}                             
              </div>}
    </div>
  );
}

export default App;
