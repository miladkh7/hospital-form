import React from "react";
import "./style.scss";

const TextInput = ({ value, label, required, onChange, type, max ,acceptNagative}) => {
  return (
    <div className="input-field">
      <input
        value={value}
        type={type ? type : "text"}
        required={required}
        spellCheck="false"
        onChange={(e) =>
          type === "number" && !acceptNagative
            ? /^-?\d*\.?\d+$/.test(e.target.value) && parseFloat(e.target.value) >= 0
              ? onChange(e.target.value)
              : null
            : onChange(e.target.value)
        }
        max={max}
        maxLength={max}
      />
      <label>{label}</label>
    </div>
  );
};
export default TextInput;
