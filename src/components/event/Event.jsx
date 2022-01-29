import React, { useEffect, useRef, useState } from "react";
import "./event.scss";

const Event = ({ currentEvent }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const eventRef = useRef(null);
  const headerRef = useRef(null);

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  function countdown(newEvent) {
    const newEventDate = new Date(newEvent);
    const currentDate = new Date();
    const startTime = new Date(newEventDate - currentDate);

    const totalSeconds = Math.floor(startTime / 1000);

    const days = formatTime(Math.floor(totalSeconds / 3600 / 24));
    const hours = formatTime(Math.floor((totalSeconds / 3600) % 24));
    const minutes = formatTime(Math.floor((totalSeconds / 60) % 60));
    const seconds = formatTime(Math.floor(totalSeconds % 60));

    setTime({ days: days, hours: hours, minutes: minutes, seconds: seconds });
  }

  function checkDate(currentEvent) {
    let date = currentEvent.date;
    let newEventDate = new Date(date);
    let currentDate = new Date();

    // While there's old date, increasing year.
    while (newEventDate < currentDate) {
      let eventYear = date.split(" ")[2];
      eventYear++;
      let newEventArray = date.split(" ");
      newEventArray[2] = eventYear;
      date = newEventArray.join(" ");
      newEventDate = new Date(date);
    }

    return date;
  }

  useEffect(() => {
    // Setting coundown timer for new date.
    eventRef.current.classList.remove("fade");
    headerRef.current.classList.remove("fade");

    setTimeout(() => {
      countdown(checkDate(currentEvent));

      requestAnimationFrame(() => {
        eventRef.current.classList.add("fade");
        headerRef.current.classList.add("fade");
      });
    }, 225); // timeout

    const interval = setInterval(() => {
      countdown(checkDate(currentEvent));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentEvent]);

  return (
    <div className="event">
      <div className="event__header">
        <h2 className="event__suptitle">— countdown to —</h2>
        <h1 className="event__title fade" ref={headerRef} id="title">
          {currentEvent.name}
        </h1>
      </div>
      <div className="countdown fade" ref={eventRef}>
        {Object.entries(time).map((timeItem, index) => {
          return (
            <div className="countdown__item" key={timeItem + index}>
              <div className="countdown__item-info">
                <p className="countdown__number">{timeItem[1]}</p>
                <span className="countdown__label">{timeItem[0]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Event;
