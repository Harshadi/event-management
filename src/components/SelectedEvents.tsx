import { connect, useDispatch } from "react-redux";
import { updateAction } from "../redux/action";
import Card from "../helper/Card";
import "../styles.css";
import { IEventPage } from "../interfaces";
import { Fragment } from "react";

const SelectedEvents = ({
  isSearched,
  allEvents,
  selectedEvents,
  filterData
}: IEventPage) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="mainDivider" />
      <div className="subSelected">
        <h4>
          <u>Selected Events </u>
        </h4>
        <div className="allCard">
          {isSearched && !filterData.selectedEvents.length ? (
            <h4>No Events Found!</h4>
          ) : (
            (isSearched ? filterData.selectedEvents : selectedEvents).map(
              (event, index) => (
                <div className="mainCard" key={event?.id || index}>
                  <Card
                    onClickBtn={(id: number, notSelected: boolean) =>
                      updateAction(
                        id,
                        notSelected,
                        selectedEvents,
                        allEvents,
                        isSearched ? filterData : {},
                        dispatch
                      )
                    }
                    event={event}
                  />
                </div>
              )
            )
          )}
        </div>
      </div>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectedEvents);
