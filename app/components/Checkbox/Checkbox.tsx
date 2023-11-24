import React, { useState, useEffect } from "react";

import style from "./Checkbox.module.scss";

interface Props {
  onChange: (val: any) => any;
  label: string;
  value: boolean;
  link?: boolean;
  className?: string;
  name: string;
}

const Checkbox = ({ onChange, label, link, value, name, className }: Props) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleCheckboxChange = (e: any) => {
    setChecked(e.target.checked);
    e.target.value = e.target.checked;
    onChange(e);
  };

  return (
    <div className={`${style.checkbox} ${className}`}>
      <input type="checkbox" checked={!!checked} name={name} onChange={handleCheckboxChange} />
      {label &&
        (link ? (
          <a target="_blank" href="/terms" rel="noopener noreferrer">
            <label style={{ cursor: "pointer" }}>{label}</label>
          </a>
        ) : (
          <label>{label}</label>
        ))}
    </div>
  );
};

export default Checkbox;
