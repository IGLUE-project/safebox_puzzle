export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionAfterSolve: "NONE",
  message: undefined,
  keysType: "NUMBERS",
  background: "images/standard/background.png",
  backgroundLock : "images/standard/background_lock_standard.png",
  backgroundDial: "images/standard/dial_classic.png",
  backgroundKey: "images/background_key.png",


  backgroundMessage: "images/background_message.png",
  imageLightOff: "images/standard/light_off.png",
  imageLightNok: "images/standard/light_nok.png",
  imageLightOk: "images/standard/light_ok.png",
  soundNok: "sounds/solution_nok.mp3",
  soundOk: "sounds/solution_ok.mp3",
  soundDial: "sounds/spin.wav",

  dialWidth: 0.7, // Relative size of the dial compared to the box width
  dialHeight: 0.7, // Relative size of the dial compared to the box height
  dialTextSize: "0.1", // Font size for the dial text
  dialTextColor: "#000000", // Color for the dial text

  lightBack: "false", // Controls whether to show the image behind the dial frame
};

export const SKIN_SETTINGS_RETRO = {
  background: "images/retro/background.png",
  backgroundKeypad: "images/background_keypad_retro.png",
  backgroundKey: "images/background_key_retro.png",
  
  backgroundLock : "images/retro/background_lock_retro.png",
  backgroundDial: "images/retro/dial_retro.png",

  backgroundMessage: "images/background_message_retro.png",
  imageLightOff: "images/retro/light_off_retro.png",
  imageLightNok: "images/retro/light_nok_retro.png",
  imageLightOk: "images/retro/light_ok_retro.png",
  soundDial: "sounds/spin_old.wav",
  soundNok: "sounds/solution_nok_retro.wav",
  soundOk: "sounds/solution_ok_retro.wav",

  dialTextSize: "0.06", // Font size for the dial text
  dialTextColor: "#FFFFFF", // Color for the dial text
  lightBack: "false"

};

export const SKIN_SETTINGS_FUTURISTIC = {
  background: "images/futuristic/background_futuristic.png",
  backgroundKeypad: "images/background_keypad_futuristic.png",
  backgroundKey: "images/background_key_futuristic.png",
  
  backgroundLock : "images/futuristic/background_lock_futuristic.png",
  backgroundDial: "images/futuristic/dial_futuristic.png",
  backgroundMessage: "images/background_message_futuristic.png",
  imageLightOff: "images/futuristic/light_off_futuristic.png",
  imageLightNok: "images/futuristic/light_nok_futuristic.png",
  imageLightOk: "images/futuristic/light_ok_futuristic.png",
  soundNok: "sounds/solution_nok_futuristic.wav",

  dialTextSize: "0.09", // Font size for the dial text
  dialTextColor: "#0fbdfd", // Color for the dial text
  lightBack:"true", //Para controlar si se muestra la imagen tras el marco del dial
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath:"./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
export const MESSAGE_SCREEN = "MESSAGE_SCREEN";