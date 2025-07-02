import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import SafeBoxDial from './SafeBoxDial.jsx';
import BoxButton from './BoxButton.jsx';

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [tries, setTries] = useState(0); // Contador de intentos
  const [solutionArray, setSolutionArray] = useState([]); // Array para guardar la solución
  const [currentSolution, setCurrentSolution] = useState([]);
  const [processingSolution, setProcessingSolution] = useState(false);
  const [light, setLight] = useState("off");
  const [containerWidth, setContainerWidth] = useState(0);//
  const [containerHeight, setContainerHeight] = useState(0);//
  const [containerMarginTop, setContainerMarginTop] = useState(0);//
  const [containerMarginLeft, setContainerMarginLeft] = useState(0);//
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [lightWidth, setLightWidth] = useState(0); //
  const [lightHeight, setLightHeight] = useState(0); //
  const [lightLeft, setLightLeft] = useState(0);//
  const [lightTop, setLightTop] = useState(0);//

  //
  const [rotationAngle, setRotationAngle] = useState(0); // Estado para la rotación
  const [isReseting, setIsReseting] = useState(false); // Estado para saber si se está reiniciando el lock

  //

  const styles ={
    "STANDARD": {
      //lock: "../images/standard/lock_classic.png",
      //dial: "images/standard/dial_classic.png",
      //dial_size: 0.4,
      //dial_sound: "sounds/spin.wav",
      dial_text_color: "#000000",
      dial_text_size: "13vmin",
      //dial_text_zIndex: 1,
    },
    "RETRO": {
      //lock: "images/lock_old.png",
      //dial: "images/dial_old.png",
      //dial_size: 0.5,
      //dial_sound: "sounds/spin_old2.wav",
      dial_text_color:  "#FFFFFF",
      dial_text_size: "10vmin",
      //dial_text_zIndex: 1,
    },
    "FUTURISTIC": {
      //lock: "images/lock_modern.png",
      //dial: "images/dial_modern.png",
      //dial_size: 0.6,
      dial_sound: "sounds/spin.wav",
      dial_text_color: "#59c2ca",
     // dial_text_size: "11vmin",
      //dial_text_zIndex: -1,
    }
  }
  const defaultStyle = styles["STANDARD"];
  const style = styles[appSettings.skin] || styles["STANDARD"];
//

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



    switch(appSettings.skin){
      case "RETRO":
        _containerMarginTop = 0;
       // _containerMarginLeft = 0;
        //_containerWidth = _lockWidth *0.45;
        _containerHeight = _lockHeight *0.55;
        _lightWidth = _lockWidth * 0.18;
        _lightHeight = _lockHeight *0.18;
        _lightLeft = _lockWidth * 0;
        _lightTop =  _lockHeight * -0.14;
        break;
      case "FUTURISTIC":
        _containerMarginTop = 0;//_lockHeight*0;
        //_containerMarginLeft = _lockWidth * -0.065;
       // _containerWidth = _lockWidth *0.;
        _containerHeight = _lockHeight *0.605;
         _lightWidth = _lockWidth*0.9;
        _lightHeight = _lockHeight*0.6;
        //_lightLeft = props.appWidth / 2 + _lockWidth / 2 * 0;
        //_lightTop = props.appHeight / 2 - _lockHeight / 2 * 0.9;
        _boxHeight = _lockHeight * 0.9;
        _boxWidth = _lockWidth * 0.9;

        break;
      default:
        //Standard skin
       // _containerMarginTop = 0;
        //_containerMarginLeft = _keypadWidth * 0;
        _lightWidth = _lockWidth * 0.08;
        _lightHeight = _lockHeight * 0.08;
        _lightLeft =  _lockWidth  * 0.7;
        _lightTop =  _lockHeight  * 0.1
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
  }

  const onClickButton = (value) => {
    if (processingSolution) {
      return;
    }
    Utils.log("onClickButton", value);
    setProcessingSolution(true);

    const shortBeep = document.getElementById("audio_beep");
    shortBeep.pause();
    shortBeep.currentTime = 0;
    shortBeep.play();

    setTimeout(() => {
      currentSolution.push(value);
      if (currentSolution.length < appSettings.solutionLength) {
        setCurrentSolution(currentSolution);
        setProcessingSolution(false);
      } else {
        const solution = currentSolution.join((["COLORS","SYMBOLS"].indexOf(appSettings.keysType) !== -1) ? ";" : "");
        setCurrentSolution([]);
        Utils.log("Check solution", solution);
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
    }, 300);
  }

  const checkSolution = () => {
    setProcessingSolution(true);
    Utils.log("Check solution", solutionArray);
    const solution = solutionArray.join(';');
    //const solution="12315"
    reset(); // Reinicia el lock
    console.log("Check solution", solution);
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
        props.onKeypadSolved(solution); //Cambiar
      }
    }, afterChangeBoxLightDelay);

    audio.play();
  }

  //Pone la imagen del fondo
  //let backgroundImage = 'url("' + appSettings.backgroundKeypad + '")';
  let backgroundImage = 'url("' + appSettings.background + '")';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }


  const  reset = () =>{
    //console.log("Solution: ", solutionArray);
    setIsReseting(true);
    setRotationAngle(0); // Reinicia el ángulo de rotación
    setSolutionArray([]);
    //setTries(0);
    setTimeout(() => {      
      setIsReseting(false);
    }, 2500);
    //setChecking(false);
  }

  useEffect(() => { // Comprueba si se ha alcanzado el número máximo de intentos (En local y en API)           
    //console.log("Tries: ", tries, "Solution: ", solutionArray);
      solutionArray.length >= appSettings.solutionLength && checkSolution();
      console.log("Solution: ", solutionArray);
  }, [solutionArray]);

  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: backgroundImage }}>
      <div id="lockContainer" className="lockContainer" 
        style={{backgroundImage: 'url('+appSettings.backgroundLock+')', width: containerWidth, 
          height: containerHeight, marginTop: containerMarginTop, marginLeft: containerMarginLeft ,
          display: "flex", alignItems: "center", 
          justifyContent: "center", flexDirection: "column"
        }}>
      {/*<div id="keypad" style={{ width: containerWidth, height: containerHeight, marginTop: containerMarginTop, marginLeft: containerMarginLeft }}>
        <audio id="audio_beep" src={appSettings.soundBeep} autostart="false" preload="auto" />
        <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
        <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
        <div id="row1" className="row">
          <BoxButton value={appSettings.keys[0]} position={1} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[1]} position={2} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[2]} position={3} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row2" className="row">
          <BoxButton value={appSettings.keys[3]} position={4} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[4]} position={5} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[5]} position={6} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row3" className="row">
          <BoxButton value={appSettings.keys[6]} position={7} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[7]} position={8} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[8]} position={9} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div id="row4" className="row">
          <BoxButton value={appSettings.keys[9]} position={10} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[10]} position={11} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
          <BoxButton value={appSettings.keys[11]} position={12} onClick={onClickButton} boxHeight={boxHeight} boxWidth={boxWidth} />
        </div>
        <div className="boxLight boxLight_off" style={{ visibility: light === "off" ? "visible" : "hidden", opacity: light === "off" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOff + '")', left: lightLeft, top: lightTop }} ></div> 
        <div className="boxLight boxLight_nok" style={{ visibility: light === "nok" ? "visible" : "hidden", opacity: light === "nok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightNok + '")', left: lightLeft, top: lightTop }} ></div> 
        <div className="boxLight boxLight_ok" style={{ visibility: light === "ok" ? "visible" : "hidden", opacity: light === "ok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOk + '")', left: lightLeft, top: lightTop }} ></div> 
      </div>*/}
        <SafeBoxDial styles={style}
              boxWidth={boxWidth} boxHeight={boxHeight} checking={processingSolution} 
              rotationAngle={rotationAngle} setRotationAngle={setRotationAngle}
              setSolutionArray={setSolutionArray} isReseting={isReseting}/>
              
      
      <div className="boxLight boxLight_off" style={{ visibility: light === "off" ? "visible" : "hidden", opacity: light === "off" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOff + '")', left: lightLeft, top: lightTop }} ></div> 
      <div className="boxLight boxLight_nok" style={{ visibility: light === "nok" ? "visible" : "hidden", opacity: light === "nok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightNok + '")', left: lightLeft, top: lightTop }} ></div> 
      <div className="boxLight boxLight_ok" style={{ visibility: light === "ok" ? "visible" : "hidden", opacity: light === "ok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOk + '")', left: lightLeft, top: lightTop }} ></div>
      <audio id="audio_beep" src={appSettings.soundBeep} autostart="false" preload="auto" />
      <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
      <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
      </div>

      {appSettings.lightBack==="true" && <div className='lockFuture' style={{ zIndex:4 , backgroundImage: 'url('+appSettings.backgroundLock+')', width: containerWidth, height: containerHeight,}}></div>}
      <p id="rotationNum" className='rotationNum' onDragStart={(event) => event.preventDefault()} 
            style={{color: appSettings.dialTextColor, fontSize:appSettings.dialTextSize, zIndex:5}}
            >{rotationAngle/6}</p> 
 
    </div>);
};

export default MainScreen;