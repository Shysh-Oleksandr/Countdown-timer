import React from "react";
import "./events.scss";

const Events = () => {
  return (
    <nav className="countdown__navigation" id="nav">
      <ul className="countdown__list">
        <li className="countdown__link active">
          <a href="" data-image="img/halloween.webp" data-date="31 Oct 2022">
            Halloween
          </a>
        </li>
        <li className="countdown__link">
          <a href="" data-image="img/christmas.webp" data-date="25 Dec 2019">
            Christmas
          </a>
        </li>
        <li className="countdown__link">
          <a href="" data-image="img/newYear.webp" data-date="1 Jan 2022">
            New Year
          </a>
        </li>
        <li className="countdown__link">
          <a href="" data-image="img/easter.webp" data-date="17 Apr 2020">
            Easter
          </a>
        </li>
        <li className="countdown__link">
          <a
            href=""
            data-image="img/valentinesDay.webp"
            data-date="14 Feb 2021"
          >
            Valentine’s Day
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Events;
