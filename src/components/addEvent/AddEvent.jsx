import React, { useEffect, useRef, useState } from "react";
import "./addEvent.scss";
import { useForm } from "react-hook-form";
import Slider from "react-slick";
import bgImagesData from "./../../data/bgImagesData";
import colorsData from "../../data/colorsData";

const AddEvent = ({
  isAddEventMenu,
  setIsAddEventMenu,
  setEvents,
  setCurrentEventIndex,
  events,
  currentEventIndex,
  isEditing,
  setIsEditing,
}) => {
  const ref = useRef();
  const sliderRef = useRef();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [currentBgImageIndex, setCurrentBgImageIndex] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const currentEvent = events[currentEventIndex];
  const bgImagesSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    dots: false,
    slidesToScroll: 3,
    variableWidth: true,
    initialSlide: isEditing
      ? getIndexByValue(currentEvent.image, bgImagesData)
      : 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const colorsSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    dots: false,
    slidesToScroll: 3,
    variableWidth: true,
    initialSlide: isEditing
      ? getIndexByValue(currentEvent.color, colorsData)
      : 0,
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isAddEventMenu &&
        events.length > 0 &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsAddEventMenu(false);
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isAddEventMenu, events]);

  function convertDate(date) {
    var dateObj = new Date(date + " EDT");
    return dateObj.toISOString().substring(0, 10);
  }

  function getIndexByValue(value, array) {
    return array.indexOf(value);
  }

  useEffect(() => {
    if (isEditing) {
      setCurrentBgImageIndex(getIndexByValue(currentEvent.image, bgImagesData));
      setCurrentColorIndex(getIndexByValue(currentEvent.color, colorsData));
    }
  }, [isEditing, isAddEventMenu]);

  function onSubmit() {
    let eventName = getValues("name");
    let eventDate = getValues("date");
    console.log("subm");
    if (isEditing) {
      setEvents((prevEvents) => {
        let newEvents = prevEvents.map((event) => {
          if (event.id === currentEvent.id) {
            return {
              id: event.id,
              name: eventName,
              date: eventDate,
              image: bgImagesData[currentBgImageIndex],
              color: colorsData[currentColorIndex],
            };
          }

          return event;
        });
        return newEvents;
      });
      setIsEditing(false);
    } else {
      setEvents((prevEvents) => {
        return [
          ...prevEvents,
          {
            id: prevEvents.length,
            name: eventName,
            date: eventDate,
            image: bgImagesData[currentBgImageIndex],
            color: colorsData[currentColorIndex],
          },
        ];
      });
      setCurrentEventIndex(events.length);
    }

    setIsAddEventMenu(false);
  }

  function deleteEvent() {
    setEvents((prevEvents) => {
      const newEvents = prevEvents.filter((event) => event !== currentEvent);
      return newEvents;
    });
    setCurrentEventIndex((prevIndex) => {
      return prevIndex === events.length - 1 ? 0 : prevIndex;
    });
    events.length !== 1 && setIsAddEventMenu(false);
    setIsEditing(false);
  }

  return (
    <div className="add-event__wrapper">
      <div className="add-event" ref={ref}>
        <h2 className="add-event__title">
          {isEditing ? "Editing the event" : "Adding a new event"}
        </h2>
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
              defaultValue={isEditing ? currentEvent.name : ""}
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
              defaultValue={isEditing ? convertDate(currentEvent.date) : ""}
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
            <h4 className="add-event__slider-label">Background image:</h4>
            <ul className="add-event__bg-images-list">
              <Slider {...bgImagesSettings} ref={sliderRef}>
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

          <div className="add-event__colors">
            <h4 className="add-event__slider-label">Theme color:</h4>
            <ul className="add-event__colors-list">
              <Slider {...colorsSettings}>
                {colorsData.map((color, index) => {
                  return (
                    <li
                      className={`add-event__color ${
                        index === currentColorIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentColorIndex(index)}
                      key={index + color}
                    >
                      <span style={{ backgroundColor: color }}></span>
                    </li>
                  );
                })}
              </Slider>
            </ul>
          </div>
          <button className="add-event__btn" type="submit">
            {isEditing ? "Edit" : "Add"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={deleteEvent}
              className="add-event__btn add-event__btn--delete"
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
