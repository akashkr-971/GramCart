export {};

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export {};

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition; 
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
