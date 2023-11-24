import PropTypes from 'prop-types';

import styles from '../Input/Input.module.scss';

const Textarea = ({
  value,
  name,
  onChange,
  onFocus,
  onBlur,
  label,
  error,
  warning,
  disabled,
  dark
}) => (
    <div className={`${styles.inputWrap} ${error ? styles.error : ''} ${dark ? styles.dark : ''}`}>
      <span>{label}</span>
      <textarea
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        rows="6"
      />
      {
        !!error && <span className={styles.errorText}>{error}</span>
      }
      {
        !!warning && <span className={styles.warningText}>{warning}</span>
      }
    </div>
  )

export default Textarea;