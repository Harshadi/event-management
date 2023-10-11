import * as React from 'react';
import { connect, useDispatch } from "react-redux";
import { updateAction } from "../redux/action";
import Card from "../helper/Card";
import "../styles.css";
import { IEventPage } from "../interfaces";

const AllEvents = ({
  isSearched,
  allEvents,
  selectedEvents,
  filterData
}: IEventPage) => {
  const dispatch = useDispatch();

  const handleClick = (id: number, notSelected: boolean) =>
    updateAction(
      id,
      notSelected,
      selectedEvents,
      allEvents,
      isSearched ? filterData : {},
      dispatch
    );

  return (
    <div className={selectedEvents.length ? "withSelected" : "subContainer"}>
      <h4>
        <u>All Events</u>
      </h4>
      <div className="allCard">
        {isSearched && !filterData.events.length ? (
          <h4>No Events Found!</h4>
        ) : (
          (isSearched ? filterData.events : allEvents).map((event, index) => (
            <div className="mainCard" key={event?.id || index}>
              <Card onClickBtn={handleClick} notSelected event={event} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ allEvents, filterData, selectedEvents }) => {
  return {
    allEvents,
    filterData,
    selectedEvents
  };
};

const mapDispatchToProps = {
  updateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents);
