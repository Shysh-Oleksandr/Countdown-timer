import React, { useEffect, useState } from "react";
import "./event.scss";

const Event = ({ currentEvent }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  useEffect(() => {
    countdown(currentEvent.date);

    const interval = setInterval(() => {
      countdown(currentEvent.date);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="event fade">
      <div className="event__header">
        <h2 className="event__suptitle">— countdown to —</h2>
        <h1 className="event__title" id="title">
          {currentEvent.name}
        </h1>
      </div>
      <div className="countdown">
        <div className="countdown__item">
          <div className="countdown__days countdown__item-info">
            <p className="countdown__number" id="days">
              {time.days}
            </p>
            <span className="countdown__label">days</span>
          </div>
        </div>
        <div className="countdown__item">
          <div className="countdown__hours countdown__item-info">
            <p className="countdown__number" id="hours">
              {time.hours}
            </p>
            <span className="countdown__label">hours</span>
          </div>
        </div>
        <div className="countdown__item">
          <div className="countdown__minutes countdown__item-info">
            <p className="countdown__number" id="minutes">
              {time.minutes}
            </p>
            <span className="countdown__label">minutes</span>
          </div>
        </div>
        <div className="countdown__item">
          <div className="countdown__seconds countdown__item-info">
            <p className="countdown__number" id="seconds">
              {time.seconds}
            </p>
            <span className="countdown__label">seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
