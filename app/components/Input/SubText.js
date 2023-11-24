import PropTypes from 'prop-types';

import style from './SubText.module.scss';

const SubText = ({ children, dark }) => (
  <p className={`${style.subText}  ${dark ? style.dark : ''}`}>{children}</p>
)

SubText.propTypes = {
  children: PropTypes.string.isRequired,
};


export default SubText;