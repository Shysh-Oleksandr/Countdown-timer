import { createGlobalStyle } from "styled-components";
import AddEvent from "./components/addEvent/AddEvent";
import Event from "./components/event/Event";
import Events from "./components/events/Events";
import bgImagesData from "./data/bgImagesData";
import eventsData from "./data/eventsData";
import { useLocalStorage } from "./LocalStorage";

function App() {
  const [events, setEvents] = useLocalStorage("events", eventsData);
  const [currentEventIndex, setCurrentEventIndex] = useLocalStorage(
    "currentEventIndex",
    0
  );
  const [isAddEventMenu, setIsAddEventMenu] = useLocalStorage(
    "isAddEventMenu",
    false
  );
  const [isEditing, setIsEditing] = useLocalStorage("isEditing", false);
  const GlobalStyles = createGlobalStyle`
  :root {
    --eventColor: ${
      events[currentEventIndex] ? events[currentEventIndex].color : "#fff"
    };
  }
`;

  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `url(${
          events[currentEventIndex]
            ? events[currentEventIndex].image
            : bgImagesData[0]
        })`,
      }}
    >
      <GlobalStyles />
      {events.length !== 0 && (
        <Event currentEvent={events[currentEventIndex]} />
      )}
      {events.length !== 0 && (
        <Events
          events={events}
          currentEventIndex={currentEventIndex}
          setCurrentEventIndex={setCurrentEventIndex}
          setIsAddEventMenu={setIsAddEventMenu}
          setIsEditing={setIsEditing}
        />
      )}
      {isAddEventMenu && (
        <AddEvent
          isAddEventMenu={isAddEventMenu}
          setIsAddEventMenu={setIsAddEventMenu}
          setEvents={setEvents}
          setCurrentEventIndex={setCurrentEventIndex}
          isEditing={isEditing}
          events={events}
          currentEventIndex={currentEventIndex}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default App;
