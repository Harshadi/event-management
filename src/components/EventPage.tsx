import { Fragment, useEffect, useMemo, useState } from "react";
import "../styles.css";
import { IEventPage } from "../interfaces";
import { updateAction, searchAction } from "../redux/action";
import { connect, useDispatch } from "react-redux";
import debouce from "lodash.debounce";
import Error from "../helper/Error";
import AllEvents from "./AllEvents";
import SelectedEvents from "./SelectedEvents";

const EventPage = ({ allEvents, selectedEvents, loading }: IEventPage) => {
  const dispatch = useDispatch();
  const [isSearched, setIsSearched] = useState(false);

  function search(e: { target: { value: string } }) {
    searchAction(
      e.target.value,
      allEvents,
      selectedEvents,
      dispatch,
      setIsSearched
    );
  }

  const debouncedResults = useMemo(() => {
    return debouce(search, 300);
  }, [allEvents, selectedEvents]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  if (!allEvents.length && !loading) return <Error />;

  return (
    <Fragment>
      {!!allEvents.length && (
        <input
          onChange={debouncedResults}
          type="text"
          id="myInput"
          placeholder="swimming..."
          title="swimming..."
        />
      )}
      <div className="mainContainer">
        {!!allEvents.length && <AllEvents isSearched={isSearched} />}
        {!!selectedEvents.length && <SelectedEvents isSearched={isSearched} />}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ allEvents, selectedEvents, loading }) => {
  return {
    allEvents,
    selectedEvents,
    loading
  };
};

const mapDispatchToProps = {
  updateAction,
  searchAction
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
