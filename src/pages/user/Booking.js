import { Button } from "@material-tailwind/react";
import React from "react";

const Booking = () => {
  return (
    <div>
      <div className="h-screen row gap-2 wrap text-gray-100">
        <div className="col">
          <p className="lead">
            Please fill in the details concerning your reservation.
          </p>
          <div className="row">
            <div className="form-group">
              <label htmlFor="date">Choose date</label>
              <select id="date" data-testid="date" name="date"></select>
            </div>
            <div className="form-group">
              <label htmlFor="time">Choose time</label>
              <select id="time" data-testid="time" name="time"></select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dinners">Number of guests</label>
            <input type="number" id="dinners" name="dinners" min="1" max="30" />

            <p className="input-error">There must be at least one guest</p>
          </div>
          <div className="form-group">
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" name="occasion">
              {["None", "Birthday", "Engagement", "Wedding", "Anniversary"].map(
                (option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Seating options</label>
            {["Indoor", "Outdoor"].map((option, i) => (
              <label key={option}>
                <input type="radio" name="seatingOptions" value={option} />
                {option}
              </label>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="specialRequest">Special request</label>
            <textarea
              id="specialRequest"
              name="specialRequest"
              rows={3}
              placeholder="Add any comment here"
              style={{ resize: "none" }}
            />
            <p className="input-error">Minimum 10 characters</p>
          </div>
          <div className="row">
            <Button type="submit">Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
