import { IButton } from "../interfaces";
import "../styles.css";

const Button = ({ text, notSelected, onClick, disabled }: IButton) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={notSelected ? "btnWhite" : "btnBlack"}
    >
      {text}
    </button>
  );
};
export default Button;
