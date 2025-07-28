import './../assets/scss/main.scss';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const  SafeBoxDial = ( props ) => {
    const { appSettings } = useContext(GlobalContext);
    const [initialRotation, setInitialRotation] = useState(0); // Ángulo inicial del lock
    const [isMouseDown, setIsMouseDown] = useState(false); // Estado para saber si el mouse está presionado
    const [startAngle, setStartAngle] = useState(0); // Ángulo inicial del ratón
    const [rotationDirection, setRotationDirection] = useState(""); // Dirección de rotación

    const handleMouseMove = (event) => {
        if (!isMouseDown || props.checking || props.isReseting) return ;  
        let audio  = document.getElementById("audio_wheel");
        let rounded = calculateAngle(event); 
        const angleDifference = normalizeAngleDifference(rounded - startAngle);
        const newRotation = normalizeAngle(initialRotation + angleDifference);
        const rotationDir = getRotationDirection(props.rotationAngle/6, newRotation/6);
        if(rotationDirection === ''){
          setRotationDirection(rotationDir);
        } else if(rotationDirection !== rotationDir){
          return;
        }
        if(props.rotationAngle === newRotation) return;
        props.setRotationAngle(newRotation); 
        audio.play();
    }

    const handleMouseUp = () => {
        if (props.checking || props.isReseting ) return ;
        setIsMouseDown(false); 
        props.setSolutionArray((sol) => [...sol, (rotationDirection === "clockwise" ? String(props.rotationAngle/6) : String('-'+props.rotationAngle/6))]);
        setRotationDirection(''); 
    }

    const handleMouseDown = (event) => {
        if (props.checking || props.isReseting) return ;
        setIsMouseDown(true); 
        let rounded = calculateAngle(event); 
        setStartAngle(rounded);     
        setInitialRotation(props.rotationAngle);   
    }

    const calculateAngle = (event) => {
        const lockElement = document.getElementById("lock");
        const rect = lockElement.getBoundingClientRect();  
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;  
        const radians = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        let angle = radians * (180 / Math.PI);  
        if (angle < 0) {
          angle += 360;}
        return Math.round(angle / 6) * 6;
    }

    function getRotationDirection(prev, curr) {
        const diff = (curr - prev + 60) % 60;
        if (diff === 0) return '';
        return diff < 30 ? 'clockwise' : 'counter-clockwise';
    }

    const normalizeAngleDifference = (angle) => {
        return ((angle + 180) % 360) - 180;
    }

    const normalizeAngle = (angle) => {
        return ((angle % 360) + 360) % 360; // Asegura que el ángulo esté entre 0 y 360
    }

    const reset = () => {
        setStartAngle(0);
        setRotationDirection("");
    }

    useEffect(() => {    
        if (props.isReseting) { 
            reset(); 
        }
    }, [props.isReseting]); 

    return(
        <div className='lockContainer' style={{ width: props.boxWidth, height: props.boxHeight, 
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",  zIndex: 0}}        
            onDragStart={(event) => event.preventDefault()} onMouseUp={handleMouseUp} 
            onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>          
            <div id="lock" style={{ backgroundImage: 'url("' + appSettings.backgroundDial + '")',
              height:props.boxHeight*0.53, width: props.boxWidth*0.53, transform: `rotate(${props.rotationAngle}deg)`, 
              transition: props.isReseting ? (appSettings.skin !== "FUTURISTIC" ? "transform 2.5s ease" : "none") : "none",}}/>
            {appSettings.skin === "FUTURISTIC" && props.light !== "off" &&
            (props.light === "ok" ? 
              <div className='lockFuture' style={{ zIndex:4 , backgroundColor: '#3bff77', width: props.boxWidth*0.43, height: props.boxHeight*0.53, borderRadius: '50%'}}></div> 
            : <div className='lockFuture' style={{ zIndex:4 , backgroundColor: '#fe3a43', width: props.boxWidth*0.43, height: props.boxHeight*0.53, borderRadius: '50%'}}></div>)}
            <audio id="audio_wheel" src={appSettings.soundDial} autostart="false" preload="auto" />
        </div>
    );
}

export default SafeBoxDial;