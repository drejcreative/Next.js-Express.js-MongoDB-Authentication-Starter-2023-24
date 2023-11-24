import PropTypes from "prop-types";

import { default as SwitchComponent } from "react-switch";

import styles from "./Switch.module.scss";

interface Props {
  checked?: boolean;
  handleChange: () => void;
}

const Switch = ({ checked, handleChange }: Props) => {
  return (
    <SwitchComponent
      onChange={handleChange}
      checked={checked}
      className={styles.rcSwitch}
      onColor="#6dd1ff"
      onHandleColor="#095D84"
      handleDiameter={20}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={18}
      width={38}
    />
  );
};

Switch.propTypes = {
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  checked: false,
};

export default Switch;
