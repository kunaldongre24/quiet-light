import React, { useState, useEffect } from "react";
import Firefly from "./components/Firefly";
import "./style/app.css";
import Main from "./components/Main";
import Hello from "./components/Hello";
import "./style/app.scss";
import song from "./audio/Yiruma-RiverFlowsInYou.mp3";
import Response from "./components/Response";

const App = () => {
  const quantity = 60;
  const [isContentVisible, setContentVisible] = useState(false);
  const [isHelloVisible, setHelloVisible] = useState(true);
  const [helloDisable, setHelloDisable] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let wakeLock = null;

    const requestWakeLock = async () => {
      try {
        const wakeLockCapability =
          "wakeLock" in navigator && "request" in navigator.wakeLock;
        if (!wakeLockCapability) {
          console.log("Wake Lock API not supported");
          return;
        }

        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Screen wake lock acquired");
      } catch (error) {
        console.log("Failed to acquire screen wake lock:", error);
      }
    };

    const releaseWakeLock = () => {
      if (wakeLock && wakeLock.release) {
        wakeLock.release().then(() => {
          console.log("Screen wake lock released");
        });
      }
    };

    const timer = setTimeout(() => {
      setContentVisible(true);
      requestWakeLock();
    }, 7000);

    return () => {
      clearTimeout(timer);
      releaseWakeLock();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHelloVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHelloDisable(true);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (isPlaying) {
      document.getElementById("backgroundAudio").play(); // Play the song
    }
  }, [isPlaying]);

  return (
    <div className="App">
      <Firefly quantity={quantity} />

      {showResponse ? (
        <Response />
      ) : (
        <>
          {helloDisable ? null : <Hello isVisible={isHelloVisible} />}
          <Main
            isVisible={isContentVisible}
            setShowResponse={setShowResponse}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
          />
        </>
      )}
      <audio id="backgroundAudio" src={song}></audio>
    </div>
  );
};

export default App;
