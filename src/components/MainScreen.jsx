import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import SafeBoxDial from './SafeBoxDial.jsx';

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [solutionArray, setSolutionArray] = useState([]);
  const [processingSolution, setProcessingSolution] = useState(false);
  const [light, setLight] = useState("off");
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerMarginTop, setContainerMarginTop] = useState(0);
  const [containerMarginLeft, setContainerMarginLeft] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [lightWidth, setLightWidth] = useState(0);
  const [lightHeight, setLightHeight] = useState(0);
  const [lightLeft, setLightLeft] = useState(0);
  const [lightTop, setLightTop] = useState(0);
  const [dialFontSize, setDialFontSize] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isReseting, setIsReseting] = useState(false);

  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);

  function handleResize(){
    if((props.appHeight === 0)||(props.appWidth === 0)){
      return;
    }

    let aspectRatio = 4 / 3;
    let _keypadWidth = Math.min(props.appHeight * aspectRatio, props.appWidth);
    let _keypadHeight = _keypadWidth / aspectRatio;

    let _lockWidth = Math.min(props.appHeight * aspectRatio, props.appWidth) ;
    let _lockHeight = _lockWidth / aspectRatio;

    let _containerWidth = _lockWidth *0.8;
    let _containerHeight = _lockHeight *0.8;

    let _containerMarginLeft=0;
    let _containerMarginTop=0;

    let _boxWidth = _lockWidth * 0.7;
    let _boxHeight = _lockHeight * 0.7;

    let _lightWidth;
    let _lightHeight;
    let _lightLeft;
    let _lightTop;

    let _dialFontSize;

    switch(appSettings.skin){
      case "RETRO":
        _containerMarginTop = 0;
        _containerHeight = _lockHeight *0.55;
        _lightWidth = _lockWidth * 0.18;
        _lightHeight = _lockHeight *0.18;
        _lightLeft = _lockWidth * 0;
        _lightTop =  _lockHeight * -0.14;
        _dialFontSize = _containerWidth * 0.05;
        break;
      case "FUTURISTIC":
        _containerMarginTop = 0;
        _containerHeight = _lockHeight *0.605;
         _lightWidth = _lockWidth*0.9;
        _lightHeight = _lockHeight*0.6;
        _dialFontSize = _containerWidth * 0.09;
        _boxHeight = _lockHeight * 0.9;
        _boxWidth = _lockWidth * 0.9;
        break;
      default:
        //Standard skin
        _lightWidth = _lockWidth * 0.08;
        _lightHeight = _lockHeight * 0.08;
        _lightLeft =  _lockWidth  * 0.7;
        _lightTop =  _lockHeight  * 0.1;
        _dialFontSize = _containerWidth * 0.1;
    }

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
    setContainerMarginTop(_containerMarginTop);
    setContainerMarginLeft(_containerMarginLeft);

    setBoxWidth(_boxWidth);
    setBoxHeight(_boxHeight);

    setLightWidth(_lightWidth);
    setLightHeight(_lightHeight);
    setLightLeft(_lightLeft);
    setLightTop(_lightTop);

    setDialFontSize(_dialFontSize);
  }

  const checkSolution = () => {
    setProcessingSolution(true);
    Utils.log("Check solution", solutionArray);
    const solution = solutionArray.join(';');
    //reset(); // Reinicia el lock    
    escapp.checkNextPuzzle(solution, {}, (success, erState) => {
          Utils.log("Check solution Escapp response", success, erState);
          try {
            setTimeout(() => {
              changeBoxLight(success, solution);
            }, 700);
          } catch(e){
            Utils.log("Error in checkNextPuzzle",e);
          }
        });
  }

  const changeBoxLight = (success, solution) => {
    let audio;
    let afterChangeBoxLightDelay = 1000;
    appSettings.skin === "RETRO" ? afterChangeBoxLightDelay = 4500 : afterChangeBoxLightDelay = 1500;

    if (success) {
      audio = document.getElementById("audio_success");
      setLight("ok");
      afterChangeBoxLightDelay = (appSettings.skin === "RETRO" ? 4500 : 1500);
    } else {
      audio = document.getElementById("audio_failure");
      setLight("nok");
      reset(); //
    }

    setTimeout(() => {
      if(!success){
        setLight("off");
        setProcessingSolution(false);
      }else{
        props.onSafeboxSolved(solution);
      }
    }, afterChangeBoxLightDelay);

    audio.play();
  }

  //Background
  let backgroundImage = 'url("' + appSettings.backgroundSafebox + '")';
  // Custom background not available for safebox puzzles
  // if(appSettings.background && typeof appSettings.background !== "undefined" && appSettings.background !== "NONE"){
  //   backgroundImage += ', url("' + appSettings.background + '")';
  // }
  
  const  reset = () =>{
    setIsReseting(true);
    setRotationAngle(0); // Reinicia el ángulo de rotación
    setSolutionArray([]);
    setTimeout(() => {      
      setIsReseting(false);
    }, 2500);
  }

  useEffect(() => {
      if(typeof appSettings.solutionLength === "number" && appSettings.solutionLength > 0 && solutionArray.length >= appSettings.solutionLength){
        checkSolution();
      }
  }, [solutionArray]);

  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: backgroundImage, backgroundColor: appSettings.backgroundColor }}>
      <div id="lockContainer" className="lockContainer" 
        style={{backgroundImage: 'url('+appSettings.backgroundLock+')', width: containerWidth, 
          height: containerHeight, marginTop: containerMarginTop, marginLeft: containerMarginLeft ,
          display: "flex", alignItems: "center", 
          justifyContent: "center", flexDirection: "column"
        }}>
        <SafeBoxDial boxWidth={boxWidth} boxHeight={boxHeight} checking={processingSolution} 
          rotationAngle={rotationAngle} setRotationAngle={setRotationAngle}
          setSolutionArray={setSolutionArray} isReseting={isReseting} light={light}/>
        <div className="boxLight boxLight_off" style={{ visibility: light === "off" ? "visible" : "hidden", opacity: light === "off" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOff + '")', left: lightLeft, top: lightTop }} ></div> 
        <div className="boxLight boxLight_nok" style={{ visibility: light === "nok" ? "visible" : "hidden", opacity: light === "nok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightNok + '")', left: lightLeft, top: lightTop }} ></div> 
        <div className="boxLight boxLight_ok" style={{ visibility: light === "ok" ? "visible" : "hidden", opacity: light === "ok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOk + '")', left: lightLeft, top: lightTop }} ></div>
        <audio id="audio_beep" src={appSettings.soundBeep} autostart="false" preload="auto" />
        <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
        <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
      </div>

      {appSettings.skin === "FUTURISTIC" && <div className='lockFuture' style={{ backgroundImage: 'url('+appSettings.backgroundLock+')', width: containerWidth, height: containerHeight}}></div>}
      
      <p id="rotationNum" className='rotationNum' onDragStart={(event) => event.preventDefault()} style={{fontSize:dialFontSize+"px"}}> 
        {(appSettings.skin === "FUTURISTIC" && light !== "off") 
          ? (light === "ok" ? 
            <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop:"30%"}} height={dialFontSize+"px"} width={dialFontSize+"px"} viewBox="0 -960 960 960"  fill="#3bff77"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg> :
            <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop:"30%"}} height={dialFontSize+"px"} width={dialFontSize+"px"} viewBox="0 -960 960 960" fill="#fe3a43"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>)
          : rotationAngle/6} 
      </p> 
 
    </div>);
};

export default MainScreen;