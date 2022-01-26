import React from "react";
import "./event.scss";

const Event = () => {
  return (
    <div className="event fade">
      <div className="event__header">
        <h2 className="event__suptitle">— countdown to —</h2>
        <h1 className="event__title" id="title">
          HALLOWEEN
        </h1>
      </div>
      <div className="countdown">
        <div className="countdown__item">
          <div className="countdown__days countdown__item-info">
            <p className="countdown__number" id="days">
              277
            </p>
            <span className="countdown__label">days</span>
          </div>
        </div>
        <div className="countdown__item">
          <div className="countdown__hours countdown__item-info">
            <p className="countdown__number" id="hours">
              11
            </p>
            <span className="countdown__label">hours</span>
          </div>
        </div>
        <div className="countdown__item">
          <div className="countdown__minutes countdown__item-info">
            <p className="countdown__number" id="minutes">
              18
            </p>
            <span className="countdown__label">minutes</span>
          </div>
        </div>
        <div className="countdown__item">
          <div className="countdown__seconds countdown__item-info">
            <p className="countdown__number" id="seconds">
              40
            </p>
            <span className="countdown__label">seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
