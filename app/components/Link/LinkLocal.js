import style from './Link.module.scss';

const LinkLocal = ({ text, onClick, children }) => {
  const renderText = () => {
    if (children) {
      return (
        <span>
          <span className={style.icon}>{children}</span>
          {text}
        </span>
      )
    }
    return text;
  }
  return (
    <p className={style.link} onClick={onClick} >{
      renderText()
    }</p>
  )
}

export default LinkLocal; 