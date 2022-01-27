import { useState } from "react";
import AddEvent from "./components/addEvent/AddEvent";
import Event from "./components/event/Event";
import Events from "./components/events/Events";
import eventsData from "./eventsData";

function App() {
  const [events, setEvents] = useState(eventsData);
  const [isAddEventMenu, setIsAddEventMenu] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
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
        setIsAddEventMenu={setIsAddEventMenu}
      />
      {isAddEventMenu && (
        <AddEvent
          isAddEventMenu={isAddEventMenu}
          setIsAddEventMenu={setIsAddEventMenu}
          setEvents={setEvents}
          setCurrentEventIndex={setCurrentEventIndex}
          events={events}
        />
      )}
    </div>
  );
}

export default App;
