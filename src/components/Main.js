import React, { useState, useEffect } from "react";
import json from "../json/text.json";
import axios from "axios";

function Main({ isVisible, setShowResponse, setIsPlaying, isPlaying }) {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFadeIn, setIsFadeIn] = useState(false);
  const [started, setStarted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const inputText = document.getElementById("input").value;
    if (inputText.trim().length !== 0) {
      setText(inputText);
      document.getElementById("c-text").style.opacity = 1;
      document.getElementById("input-wrapper").style.display = "none";
      setIsPlaying(true); // Start playing the song
      await axios.post(
        "https://api.quiet-light/api/v1/meditation/submitUserQuery",
        { note: inputText }
      );
    }
  };

  const onFocus = () => {
    if (window.innerWidth < 600) {
      document.getElementById("circle").style.transition = "none";
      document.getElementById("circle").style.opacity = "0.1";
    }
  };

  const onBlur = () => {
    if (window.innerWidth < 600) {
      document.getElementById("circle").style.opacity = 1;
      setTimeout(() => {
        document.getElementById("circle").style.transition = "60s linear";
      }, 100);
    }
  };

  useEffect(() => {
    if (text.length !== 0) {
      const interval = setInterval(() => {
        setStarted(true);
        setIsFadeIn(false); // Start fade-out animation
        document.getElementById("circle").classList = "circle decrease";
        setTimeout(() => {
          setMessageIndex((prevIndex) => (prevIndex + 1) % json.length);
          setIsFadeIn(true); // Start fade-in animation
        }, 1500); // Wait for fade-out animation to complete
      }, 6000); // Increase interval time for smoother transition and more reading time
      return () => clearInterval(interval);
    }
  }, [text]);

  useEffect(() => {
    if (text.length !== 0) {
      const timer = setTimeout(() => {
        setShowResponse(true);
      }, 91000); // Increase total duration before showing the response
      return () => clearTimeout(timer);
    }
  }, [text]);

  return (
    <div className={`center ${isVisible ? "visible" : null}`}>
      <form onSubmit={onSubmit}>
        <div
          className={`message ${
            started ? (isFadeIn ? "fade-in" : "fade-out") : null
          }`}
          style={{
            transition: "opacity 1.5s ease-in-out", // Smooth fade-in/out transition
          }}
        >
          {json[messageIndex].nat}
        </div>
        <div className="circle" id="circle">
          <div className="before"></div>
          <div className="after"></div>
          <span className="c-text anim5" id="c-text">
            <div
              style={{
                fontSize:
                  text.length > 800
                    ? 12
                    : text.length > 500
                    ? 14
                    : text.length > 250
                    ? 18
                    : text.length > 200
                    ? 20
                    : text.length > 150
                    ? 25
                    : text.length > 100
                    ? 25
                    : text.length > 80
                    ? 30
                    : 40,
                maxHeight: 300,
                maxWidth: 300,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {text}
            </div>
          </span>
        </div>
        <div className="input-wrapper" id="input-wrapper">
          <input
            id="input"
            type="text"
            placeholder="What's bothering you?..."
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete="off"
          />
          <button type="submit" onClick={() => setIsPlaying(!isPlaying)}>
            DONE
          </button>
        </div>
      </form>
    </div>
  );
}

export default Main;
