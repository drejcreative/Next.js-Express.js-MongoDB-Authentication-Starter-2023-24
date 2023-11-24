import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";

import styles from "./Input.module.scss";

interface Props {
  name: string;
  type?: string;
  value?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  error?: string | boolean | null;
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
  remove?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}

const Input = ({
  value,
  type,
  name,
  label,
  placeholder,
  error,
  disabled,
  multiple,
  className,
  id,
  remove,
  onChange,
  onFocus,
  onBlur,
  onKeyPress,
  onRemove,
}: Props) => (
  <div className={`${styles.inputWrap} ${error ? styles.error : ""} ${className ? className : ""}`}>
    {!!label && <span>{label}</span>}
    <input
      id={id || name}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      multiple={multiple}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
      data-testid={`input-${name}`}
    />
    {remove && !!value?.length && (
      <FaRegTimesCircle
        color="var(--border)"
        data-testid={`input-remove-icon-${name}`}
        onClick={() => {
          if (onRemove) {
            onRemove();
          }
          onChange({ target: { value: "" } });
        }}
      />
    )}
    {!!error && <span className={styles.errorText}>{error}</span>}
  </div>
);

export default Input;
