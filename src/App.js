import { useState } from "react";
import Event from "./components/event/Event";
import Events from "./components/events/Events";
import eventsData from "./eventsData";

function App() {
  const [events, setEvents] = useState([eventsData]);
  return (
    <div className="wrapper">
      <Event />
      <Events />
    </div>
  );
}

export default App;
