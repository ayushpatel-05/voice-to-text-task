// import React from 'react';
import "regenerator-runtime"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from "react";
import { useDebounce } from "../Hooks/useDebounce";

const TextToVoice = () => {
  const [response, setResponse] = useState(null);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();
  
  const debounceTranscript = useDebounce(transcript, 2000);
  
  useEffect(() => {
    if(debounceTranscript != "") {
      fetch("http://localhost:3000/conversation", {
        headers: {
          "Content-Type": "application/json",
        },      
        method: "POST",
        body: JSON.stringify({transcript: debounceTranscript})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResponse(data.response);
      })
    }
  }, [debounceTranscript])


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }
  if(!isMicrophoneAvailable) {
    return <span>Please give microphone permission</span>
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

      <h2>Your transcript: </h2>
      {console.log(transcript)}
      <p>{transcript}</p>

      <h2>AI Response:</h2>
      <p>{response}</p>
    </div>
  );
};
export default TextToVoice;