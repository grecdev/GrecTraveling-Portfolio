import React from "react";
import PropTypes from "prop-types";

import SectionHeader from "../SectionHeader";

const FilterEmpty = ({ hotels }) => {
  return (
    <section id="filters-empty-wrapper" className="p-2">
      <SectionHeader
        title={`How to search for ${hotels ? "hotels" : "flights"}`}
        image={"section-header-logo-blue.svg"}
      />

      <div className="filters-empty-container">
        <div className="filters-empty-box p-1 text-center">
          <h3 className="heading mb-1">Location</h3>
          <p className="mb-1 description">
            {hotels ? "City or Country" : "Flying From"} input is optional (
            disabled in the .js file )
          </p>

          <p className="mb-1">Locations available:</p>
          <ul>
            <li>Dubai</li>
            <li>New York</li>
            <li>Amsterdam</li>
            <li>Thailand</li>
          </ul>
        </div>

        <div className="filters-empty-box p-1 text-center">
          <h3 className="heading mb-1">
            {hotels ? "Check-in / Check-out" : "Departing / Returning"}
          </h3>

          <p className="mb-1 description">
            The datepicker filters the {hotels ? "hotels" : "flights"} only for
            months and for the current year.
          </p>

          <p className="mb-2">
            If you select a month in the year 1000 and another in 1001 it won't
            work
          </p>

          <p className="mb-2">
            There are a total of 12 {hotels ? "hotels" : "flights"}, for each
            month i have one {hotels ? "hotel" : "flight"} item
          </p>

          <p>
            First i set a checkin / checkout month in the json API, but i had to
            change the json file each month
          </p>
        </div>

        <div className="filters-empty-box p-1 text-center">
          <h3 className="heading mb-1">{hotels ? "People" : "Passengers"}</h3>
          <p className="mb-1 description">
            The {hotels ? "hotel room" : "flight"} price is multiplied by the
            number of {hotels ? "people" : "passengers"}
          </p>
          <p>Maximum of 4 {hotels ? "people" : "passengers"} available</p>
        </div>
      </div>
    </section>
  );
};

FilterEmpty.propTypes = {
  hotels: PropTypes.bool.isRequired,
};

export default FilterEmpty;
