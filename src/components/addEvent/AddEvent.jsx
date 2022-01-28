import React, { useEffect, useRef, useState } from "react";
import "./addEvent.scss";
import { useForm } from "react-hook-form";
import Slider from "react-slick";
import bgImagesData from "./../../data/bgImagesData";

const AddEvent = ({
  isAddEventMenu,
  setIsAddEventMenu,
  setEvents,
  setCurrentEventIndex,
  events,
}) => {
  const ref = useRef();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    dots: false,
    slidesToScroll: 3,
    variableWidth: true,
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isAddEventMenu && ref.current && !ref.current.contains(e.target)) {
        setIsAddEventMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isAddEventMenu]);

  function onSubmit() {
    let eventName = getValues("name");
    let eventDate = getValues("date");
    setIsAddEventMenu(false);
    setEvents((prevEvents) => {
      return [
        ...prevEvents,
        {
          id: prevEvents.length,
          name: eventName,
          date: eventDate,
          image: bgImagesData[currentBgImageIndex],
        },
      ];
    });
    setCurrentEventIndex(events.length);
  }

  return (
    <div className="add-event__wrapper">
      <div className="add-event" ref={ref}>
        <h2 className="add-event__title">Adding a new event</h2>
        <form className="add-event__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-event__block">
            <label className="add-event__label" htmlFor="add-event__name">
              Name:
            </label>
            <input
              id="add-event__name"
              placeholder="Birthday"
              type="text"
              className="add-event__input"
              {...register("name", { required: true, maxLength: 16 })}
            />
          </div>
          {errors.name?.type === "required" ? (
            <span className="add-event__error">Event name is required.</span>
          ) : (
            errors.name?.type === "maxLength" && (
              <span className="add-event__error">
                Event name must be no longer than 16 characters
              </span>
            )
          )}
          <div className="add-event__block">
            <label className="add-event__label" htmlFor="add-event__date">
              Date:
            </label>
            <input
              id="add-event__date"
              type="date"
              className="add-event__input"
              {...register("date", {
                required: true,
                validate: (date) => new Date(date) >= new Date(),
              })}
            />
          </div>
          {errors.date?.type === "required" ? (
            <span className="add-event__error">Event date is required.</span>
          ) : (
            errors.date && (
              <span className="add-event__error">Event date is old.</span>
            )
          )}

          <div className="add-event__bg-images">
            <h4 className="add-event__bg-images-label">Background image:</h4>
            <ul className="add-event__bg-images-list">
              <Slider {...settings}>
                {bgImagesData.map((bgImage, index) => {
                  return (
                    <li
                      className={`add-event__bg-image ${
                        index === currentBgImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentBgImageIndex(index)}
                      key={index + bgImage}
                    >
                      <img src={bgImage} />
                    </li>
                  );
                })}
              </Slider>
            </ul>
          </div>

          <button className="add-event__btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
