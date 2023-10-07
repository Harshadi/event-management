import { ICard } from "../interfaces";
import { Button } from "./Button";
import "./styles.css";

export const Card = ({ event, notSelected, onClickBtn }: ICard) => {
  const getTime = (time) => {
    const date = new Date(time);
    const format = date.getHours() < 12 ? "AM" : "PM";
    return `${Math.abs(12 - date.getHours())}${
      date.getMinutes() ? ":" + date.getMinutes() : ""
    } ${format}`;
  };
  return (
    <>
      <div className="card">
        <div className="eCategoryTitle">
          {event?.event_category?.[0] || "A"}
        </div>
        <div className="divider" />
        <div className="cardDetails">
          <h4 className="eName">{event?.event_name}</h4>
          <h5 className="eCategory">{`(${event?.event_category})`}</h5>
          <h6 className="eTime">
            {getTime(event?.start_time)} - {getTime(event?.end_time)}
          </h6>
        </div>
      </div>
      <Button
        onClick={() => onClickBtn(event?.id, notSelected)}
        text={notSelected ? "Select" : "Remove"}
        notSelected={notSelected}
      />
    </>
  );
};
