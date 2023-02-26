import React from "react";

const Inputs = ({
  label,
  type,
  isDark,
  setValue,
  id,
  ariaDescribely,
  placeholder,
  checkValue,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={`form-control my-1 ${
          isDark ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        id={id}
        name={id}
        aria-describedby={ariaDescribely}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          checkValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Inputs;
