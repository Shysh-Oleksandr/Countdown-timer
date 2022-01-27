import React from "react";
import "./events.scss";

const Events = ({
  events,
  currentEventIndex,
  setCurrentEventIndex,
  setIsAddEventMenu,
}) => {
  function changeCountdown(e) {
    e.preventDefault();
    const event = events.find((event) => {
      return event.name.toLowerCase() === e.target.innerText.toLowerCase();
    });
    setTimeout(() => {
      setCurrentEventIndex(event.id);
    }, 225);
  }

  return (
    <nav className="countdown__navigation" id="nav">
      <ul className="countdown__list">
        {events.map((event) => {
          return (
            <li
              key={event.name + event.id}
              className={`countdown__link ${
                event.id === currentEventIndex ? "active" : ""
              }`}
            >
              <a onClick={(e) => changeCountdown(e)} href="">
                {event.name}
              </a>
            </li>
          );
        })}
        <li
          className="countdown__link countdown__link--add"
          onClick={(e) => {
            e.preventDefault();
            setIsAddEventMenu(true);
          }}
        >
          <a href="">
            <span>+</span> Add an event
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Events;
