import { useState } from "react";
import Event from "./components/event/Event";
import Events from "./components/events/Events";
import eventsData from "./eventsData";

function App() {
  const [events, setEvents] = useState(eventsData);
  const [currentEventIndex, setCurrentEventIndex] = useState(1);
  return (
    <div
      className="wrapper"
      style={{ backgroundImage: `url(${events[currentEventIndex].image})` }}
    >
      <Event currentEvent={events[currentEventIndex]} />
      <Events
        events={events}
        currentEventIndex={currentEventIndex}
        setCurrentEventIndex={setCurrentEventIndex}
      />
    </div>
  );
}

export default App;
