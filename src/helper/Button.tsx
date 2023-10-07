import { IButton } from "../interfaces";
import "./styles.css";

export const Button = ({ text, notSelected, onClick }: IButton) => {
  return (
    <button onClick={onClick} className={notSelected ? "btnWhite" : "btnBlack"}>
      {text}
    </button>
  );
};
