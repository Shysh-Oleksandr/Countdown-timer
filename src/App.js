import { useState } from "react";
import Event from "./components/event/Event";
import Events from "./components/events/Events";
import eventsData from "./eventsData";

function App() {
  const [events, setEvents] = useState(eventsData);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  return (
    <div className="wrapper">
      <Event currentEvent={events[currentEventIndex]} />
      <Events events={events} />
    </div>
  );
}

export default App;
