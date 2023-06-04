import React from "react";

function MapEvents(props) {

    const anEvent = props.event;

    const eventDay = anEvent.metaData.dateStart;
    const [date] = eventDay.split("T");
    const [year, month, day] = date.split("-");
    const eventDayFixed = new Date(+year, +month - 1, +day).toDateString();

    const onLocalViewMore = () => {

        props.onEventViewMore(anEvent);
    }

    const onLocalEdit = () => {

        props.onEventEdit(anEvent);
    }



    return (
        <div className="card mb-4">
            <div className="card-body shadow">
                <h3 className="card-name pb-2">{anEvent.name}</h3>
                <h6 className="card-name ">{eventDayFixed}</h6>
                <h5 className="card-subtitle">{anEvent.headline}</h5>
                <p className="card-text">{anEvent.summary}  </p>
                <button
                    type="submit"
                    className="btn btn-light border"
                    style={{ marginRight: "150px" }}
                    id="viewMoreEvent"
                    onClick={onLocalViewMore}
                >
                    View More
                </button>

                <button
                    type="submit"
                    className="btn btn-secondary"
                    id="editEvent"
                    onClick={onLocalEdit}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default MapEvents;