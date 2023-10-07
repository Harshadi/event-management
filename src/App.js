import { useEffect, useState } from "react";
import EventPage from "./components/EventPage";
import { getChat } from "./services/getChat";
import "./styles.css";

export default function App() {
  const [eventData, setEventData] = useState([]);

  const getData = async () => {
    await getChat()
      .then((res) => setEventData(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!eventData.length) {
      getData();
    }
  });

  return (
    <div className="App">
      <EventPage eventData={eventData} />
    </div>
  );
}
