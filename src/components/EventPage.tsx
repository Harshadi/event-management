import { Fragment, useEffect, useState } from "react";
import "../helper/styles.css";
import { Card } from "../helper/Card";
import { Button } from "../helper/Button";
import { IEventPage } from "../interfaces";
import { setAllEventsAction } from "../redux/action";
import { connect } from "react-redux";

function throttle(func, delay) {
  let timerId;

  return function (...args) {
    if (!timerId) {
      func.apply(this, args);
      timerId = setTimeout(() => {
        timerId = null;
      }, delay);
    }
  };
}

function debounce(func, delay) {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

const EventPage = ({ eventData, eventDataArr }: IEventPage) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState(eventData);
  const [filterData, setFilterData] = useState({
    events: [],
    selectedEvents: []
  });
  console.log(eventDataArr, "eventDataArr123");
  useEffect(() => {
    if (!allEvents.length) {
      setAllEvents(eventData);
    }
  });

  const checkOverlap = (start_time, end_time) => {
    let isOverlap = true;
    console.log(start_time, end_time, selectedEvents);
    if (!selectedEvents.length) return true;
    if (selectedEvents.length === 3) return false;
    selectedEvents.map((event) => {
      if (
        (event.start_time <= start_time && event.end_time > start_time) ||
        (event.start_time <= end_time && event.end_time > end_time)
      ) {
        isOverlap = false;
        return false;
      }
    });
    return isOverlap;
  };

  const updateEvent = (id, notSelected) => {
    console.log(id, notSelected);
    const selectedOnes = [...selectedEvents];
    const allData = [...allEvents];
    if (notSelected) {
      allEvents.forEach((data, index) => {
        if (data.id === id) {
          const isNotOverlap = checkOverlap(data.start_time, data.end_time);
          if (isNotOverlap) {
            console.log(data, "data");
            setAllEventsAction(data);
            selectedOnes.push(data);
            allData.splice(index, 1);
            setAllEvents(allData);
            setSelectedEvents(selectedOnes);
          } else {
            console.log("Time overlap happened");
          }
        }
      });
    } else {
      selectedEvents.forEach((data, index) => {
        if (data.id === id) {
          allData.push(data);
          selectedOnes.splice(index, 1);
        }
      });
      setAllEvents(allData);
      setSelectedEvents(selectedOnes);
    }
  };

  const search = (value) => {
    const arr = { events: [], selectedEvents: [] };
    if (!value) {
      setFilterData(arr);
      return;
    }
    allEvents.forEach((event) => {
      console.log(event, value);
      if (
        event.event_name.toLowerCase().includes(value) ||
        event.event_category.toLowerCase().includes(value)
      ) {
        arr.events.push(event);
      }
    });
    selectedEvents.forEach((event) => {
      if (
        event.event_name.toLowerCase().includes(value) ||
        event.event_category.toLowerCase().includes(value)
      ) {
        arr.selectedEvents.push(event);
      }
    });
    console.log(arr);
    setFilterData(arr);
  };

  return (
    <Fragment>
      <input
        onChange={(e) => debounce(search(e.target.value), 1000)}
        type="text"
        id="myInput"
        placeholder="swimming..."
        title="swimming..."
      />
      <div className="sortBy">
        <Button text="Sort By" />
      </div>
      <div className="mainContainer">
        {!!allEvents.length && (
          <div>
            <h4>
              <u>All Events</u>
            </h4>
            <div className="allCard">
              {(filterData.events.length ? filterData.events : allEvents).map(
                (event) => (
                  <div className="mainCard">
                    <Card
                      onClickBtn={throttle(updateEvent, 2000)}
                      notSelected
                      event={event}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
        {/*selected event section*/}
        {!!selectedEvents.length && (
          <>
            <div className="mainDivider" />
            <div>
              <h4>
                <u>Selected Events </u>
              </h4>
              <div className="allCard">
                {(filterData.selectedEvents.length
                  ? filterData.selectedEvents
                  : selectedEvents
                ).map((event) => (
                  <div className="mainCard">
                    <Card onClickBtn={updateEvent} event={event} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ eventDataArr }) => {
  return {
    eventDataArr
  };
};

const mapDispatchToProps = {
  setAllEventsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
