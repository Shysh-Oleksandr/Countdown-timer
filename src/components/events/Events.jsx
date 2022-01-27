import React from "react";
import "./events.scss";
import Slider from "react-slick";

const Events = ({
  events,
  currentEventIndex,
  setCurrentEventIndex,
  setIsAddEventMenu,
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
      setCurrentEventIndex(event.id);
    }, 225);
  }

  return (
    <nav className="countdown__navigation" id="nav">
      <ul className="countdown__list">
        <Slider {...settings}>
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
        </Slider>
      </ul>
      <div
        className="countdown__link--add"
        onClick={(e) => {
          e.preventDefault();
          setIsAddEventMenu(true);
        }}
      >
        <a href="">
          <span>+</span> Add an event
        </a>
      </div>
    </nav>
  );
};

export default Events;
