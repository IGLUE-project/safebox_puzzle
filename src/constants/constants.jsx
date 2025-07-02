export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionAfterSolve: "NONE",
  message: undefined,
  keysType: "NUMBERS",
  background: "images/standard/background4.png",
  backgroundLock : "images/standard/background_lock_standard.png",
  backgroundDial: "images/standard/dial_classic.png",
  //backgroundKeypad: "images/standard/lock.png",
  backgroundKey: "images/background_key.png",
  numbers: ["1","2","3","4","5","6","7","8","9","✱","0","#"],
  letters: ["A","B","C","D","E","F","G","H","I","J","K","L"],
  colors : [
    "Red", //#FF0000
    "Green", //#008000
    "Blue", //#0000FF
    "Yellow", //#FFFF00
    "Orange", //#FFA500
    "Pink", //#FF1493
    "Cyan", //#00FFFF
    "Purple", //#800080
    "Brown", //#8B4513
    "Black", //#000000
    "Gray", //#808080
    "White", //#FFFFFF
  ],
  coloredBackgroundKeys: [
    "images/background_key_red.png",
    "images/background_key_green.png",
    "images/background_key_blue.png",
    "images/background_key_yellow.png",
    "images/background_key_orange.png",
    "images/background_key_pink.png",
    "images/background_key_cyan.png",
    "images/background_key_purple.png",
    "images/background_key_brown.png",
    "images/background_key.png",
    "images/background_key_gray.png",
    "images/background_key_white.png",
  ],
  symbols: [
    "Triangle",
    "Square",
    "Circle",
    "Rhombus",
    "Spades",
    "Hearts",
    "Clubs",
    "Diamonds",
    "Star",
    "Moon",
    "Sun",
    "Puzzle",
  ],
  symbolsBackgroundKeys: [
    "images/symbol_triangle.png",
    "images/symbol_square.png",
    "images/symbol_circle.png",
    "images/symbol_rhombus.png",
    "images/symbol_ace_spades.png",
    "images/symbol_ace_hearts.png",
    "images/symbol_ace_clubs.png",
    "images/symbol_ace_diamonds.png",
    "images/symbol_star.png",
    "images/symbol_moon.png",
    "images/symbol_sun.png",
    "images/symbol_puzzle.png",
  ],
  backgroundMessage: "images/background_message.png",
  imageLightOff: "images/standard/light_off.png",
  imageLightNok: "images/standard/light_nok.png",
  imageLightOk: "images/standard/light_ok.png",
  //soundBeep: "sounds/beep.mp3",
  soundNok: "sounds/solution_nok.mp3",
  soundOk: "sounds/solution_ok.mp3",
  soundDial: "sounds/spin.wav",

  dialWidth: 0.7, // Relative size of the dial compared to the box width
  dialHeight: 0.7, // Relative size of the dial compared to the box height
  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#000000", // Color for the dial text

  lightBack: "false", // Controls whether to show the image behind the dial frame
};

export const SKIN_SETTINGS_RETRO = {
  background: "images/retro/background.png",
  backgroundKeypad: "images/background_keypad_retro.png",
  backgroundKey: "images/background_key_retro.png",
  
  backgroundLock : "images/retro/background_lock_retro.png",
  backgroundDial: "images/retro/dial_retro.png",
  coloredBackgroundKeys: [
    "images/background_key_retro_red.png",
    "images/background_key_retro_green.png",
    "images/background_key_retro_blue.png",
    "images/background_key_retro_yellow.png",
    "images/background_key_retro_orange.png",
    "images/background_key_retro_pink.png",
    "images/background_key_retro_cyan.png",
    "images/background_key_retro_purple.png",
    "images/background_key_retro_brown.png",
    "images/background_key_retro_black.png",
    "images/background_key_retro_gray.png",
    "images/background_key_retro_white.png",
  ],
  backgroundMessage: "images/background_message_retro.png",
  imageLightOff: "images/retro/light_off_retro.png",
  imageLightNok: "images/retro/light_nok_retro.png",
  imageLightOk: "images/retro/light_ok_retro.png",
  soundBeep: "sounds/beep_retro.wav",
  soundNok: "sounds/solution_nok_retro.wav",
  soundOk: "sounds/solution_ok_retro.wav",

  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#FFFFFF", // Color for the dial text
  lightBack: "false"

};

export const SKIN_SETTINGS_FUTURISTIC = {
  background: "images/futuristic/background_futuristic.png",
  backgroundKeypad: "images/background_keypad_futuristic.png",
  backgroundKey: "images/background_key_futuristic.png",
  
  backgroundLock : "images/futuristic/background_lock_futuristic.png",
  backgroundDial: "images/futuristic/dial_futuristic.png",
  coloredBackgroundKeys: [
    "images/background_key_futuristic_red.png",
    "images/background_key_futuristic_green.png",
    "images/background_key_futuristic_blue.png",
    "images/background_key_futuristic_yellow.png",
    "images/background_key_futuristic_orange.png",
    "images/background_key_futuristic_pink.png",
    "images/background_key_futuristic_cyan.png",
    "images/background_key_futuristic_purple.png",
    "images/background_key_futuristic_brown.png",
    "images/background_key_futuristic_black.png",
    "images/background_key_futuristic_gray.png",
    "images/background_key_futuristic_white.png",
  ],
  backgroundMessage: "images/background_message_futuristic.png",
  imageLightOff: "images/futuristic/light_off_futuristic.png",
  imageLightNok: "images/futuristic/light_nok_futuristic.png",
  imageLightOk: "images/futuristic/light_ok_futuristic.png",
  soundNok: "sounds/solution_nok_futuristic.wav",

  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#0fbdfd", // Color for the dial text
  lightBack:"true", //Para controlar si se muestra la imagen tras el marco del dial
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath:"./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
export const MESSAGE_SCREEN = "MESSAGE_SCREEN";