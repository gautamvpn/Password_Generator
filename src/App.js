import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import PasswordStrengthIndicator from "./components/StrengthChecker.js";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;

    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePasswword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* password Text and copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copybtn" onClick={handleCopy}>
            {copied ? "copied" : "copy"}
          </button>
        </div>
      )}
      {/* character length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input
                onChange={() => handleCheckboxChange(index)}
                type="checkbox"
                checked={checkbox.state}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>
      {/* strength */}
      <PasswordStrengthIndicator password={password} />
      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/* Generate Button */}
      <button
        className="generateBtn"
        onClick={() => {
          generatePasswword(checkboxData, length);
        }}
      >
        Generate Password
      </button>
    </div>
  );
}
