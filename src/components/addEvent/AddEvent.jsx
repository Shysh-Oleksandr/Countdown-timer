import React, { useEffect, useRef } from "react";
import "./addEvent.scss";
import { useForm } from "react-hook-form";

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

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isAddEventMenu && ref.current && !ref.current.contains(e.target)) {
        setIsAddEventMenu(false);
      }
    };

    document.addEventListener("mouseup", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mouseup", checkIfClickedOutside);
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
          image: "/images/easter.webp",
        },
      ];
    });
    setCurrentEventIndex(events.length);
  }

  return (
    <div className="add-event__wrapper">
      <div className="add-event" ref={ref}>
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
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <span className="add-event__error">Event name is required.</span>
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

          <button className="add-event__btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
