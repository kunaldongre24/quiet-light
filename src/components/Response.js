import React, { useState, useEffect } from "react";
import "../style/response.css";

function Response() {
  const [showQuote, setShowQuote] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("response").classList = "response";
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("response").classList = "response fade-out";
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {showQuote ? (
        <div className="response o0" id="response">
          <h1 className="comingSoon">Hope you feel little better.</h1>
        </div>
      ) : (
        <div className="response wht">
          <h1>Quiet Light</h1>
          <p className="dull">Hope you feel better..</p>
          <a href="https://www.google.com/search?q=cats" target="_blank">
            <button>
              <p></p>
              Go to Quiet Light
              <p></p>
            </button>
          </a>
          {/* <p className="dull">Enter your email, we will reach you out.</p>
          <form className="flex-form">
            <input type="text" placeholder="Enter email to reach out" />
            <button type="submit">Submit</button>
          </form> */}
        </div>
      )}
    </div>
  );
}

export default Response;
