import React from "react";
import "./events.scss";
import Slider from "react-slick";
import { AiFillEdit } from "react-icons/ai";

const Events = ({
  events,
  currentEventIndex,
  setCurrentEventIndex,
  setIsAddEventMenu,
  setIsEditing,
}) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    dots: false,
    centerMode: false,
    slidesToScroll: 1,
  };

  function changeCountdown(e) {
    e.preventDefault();
    const event = events.find((event) => {
      return event.name.toLowerCase() === e.target.innerText.toLowerCase();
    });
    setTimeout(() => {
      setCurrentEventIndex(events.indexOf(event));
    }, 225);
  }

  return (
    <nav className="countdown__navigation" id="nav">
      <ul className="countdown__list">
        <Slider {...settings}>
          {events.map((event) => {
            let eventId = events.indexOf(event);
            return (
              <li
                key={event.name + eventId}
                className={`countdown__link ${
                  eventId === currentEventIndex ? "active" : ""
                }`}
              >
                <a onClick={(e) => changeCountdown(e)} href="">
                  {event.name}
                </a>
              </li>
            );
          })}
        </Slider>
      </ul>
      <div className="countdown__btns">
        <div
          className="countdown__link-btn countdown__link--add"
          onClick={(e) => {
            e.preventDefault();
            setIsAddEventMenu(true);
          }}
        >
          <a href="">
            <span className="add-icon">+</span> <span>Add an event</span>
          </a>
        </div>
        <div
          className="countdown__link-btn countdown__link--edit"
          onClick={(e) => {
            e.preventDefault();
            setIsAddEventMenu(true);
            setIsEditing(true);
          }}
        >
          <a href="">
            <span className="edit-icon">
              <AiFillEdit />
            </span>{" "}
            <span>Edit this event</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Events;
