import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import EventPage from "./components/EventPage";
import { getEvents } from "./services/getEvents";
import "./styles.css";
import { updateAction } from "./redux/action";
import { SET_LOADING } from "./redux/actionTypes";
import Error from "./helper/Error";

function App() {
  const dispatch = useDispatch();

  const getData = async () => {
    await getEvents()
      .then((res) => updateAction(null, null, [], res, [], dispatch))
      .catch((err) => {
        dispatch({
          type: SET_LOADING,
          payload: false
        });
        return <Error />;
      });
  };

  useEffect(() => {
    dispatch({
      type: SET_LOADING,
      payload: true
    });
    getData();
  });

  return (
    <div className="App">
      <EventPage />
    </div>
  );
}

const mapStateToProps = ({}) => {
  return {};
};

const mapDispatchToProps = {
  updateAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
