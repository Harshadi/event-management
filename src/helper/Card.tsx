import React, { Fragment } from "react";
import { ICard } from "../interfaces";
import Button from "./Button";
import "../styles.css";

const Card = ({ event, notSelected, onClickBtn }: ICard) => {
  const getTime = (time: string) => {
    const date = new Date(time);
    const format = date.getHours() < 12 ? "AM" : "PM";
    return `${Math.abs(12 - date.getHours())}${
      date.getMinutes() ? ":" + date.getMinutes() : ""
    } ${format}`;
  };

  const soonMsg = (type: string) => {
    return `${type} will be disclosed soon...`;
  };

  return (
    <Fragment>
      <div className="card">
        <div className="eCategoryTitle">
          {event?.event_category?.[0] || "N/A"}
        </div>
        <div className="divider" />
        <div className="cardDetails">
          <h4 className="eName">
            {event?.event_name || soonMsg("Event Name")}
          </h4>
          <h5 className="eCategory">
            {event?.event_category
              ? `(${event.event_category})`
              : soonMsg("Category")}
          </h5>
          <h6 className="eTime">
            {event?.start_time
              ? `${getTime(event.start_time)} - ${getTime(event?.end_time)}`
              : soonMsg("Time")}
          </h6>
        </div>
      </div>
      <Button
        onClick={() => onClickBtn(event?.id, notSelected)}
        text={notSelected ? "Select" : "Remove"}
        notSelected={notSelected}
        disabled={!event?.start_time}
      />
    </Fragment>
  );
};

export default Card;
