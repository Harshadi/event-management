import { Fragment } from "react";
import "../styles.css";

const Error = () => {
  return (
    <Fragment>
      <h4>There are no events currently, please come back after some time!</h4>
      <img
        className="errorMsg"
        alt="come-back-later"
        src="https://cdn.dribbble.com/users/1260357/screenshots/5903904/character-pablo-1.gif"
      />
    </Fragment>
  );
};

export default Error;
