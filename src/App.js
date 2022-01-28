import { useState } from "react";
import AddEvent from "./components/addEvent/AddEvent";
import Event from "./components/event/Event";
import Events from "./components/events/Events";
import eventsData from "./data/eventsData";
import { useLocalStorage } from "./LocalStorage";
import { createGlobalStyle } from "styled-components";

function App() {
  const [events, setEvents] = useLocalStorage("events", eventsData);
  const [currentEventIndex, setCurrentEventIndex] = useLocalStorage(
    "currentEventIndex",
    0
  );
  const [isAddEventMenu, setIsAddEventMenu] = useState(false);
  const GlobalStyles = createGlobalStyle`
  :root {
    --eventColor: ${events[currentEventIndex].color};
  }
`;

  return (
    <div
      className="wrapper"
      style={{ backgroundImage: `url(${events[currentEventIndex].image})` }}
    >
      <GlobalStyles />
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
