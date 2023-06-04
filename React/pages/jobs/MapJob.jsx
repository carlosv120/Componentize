import React from "react";
import PropTypes from 'prop-types';


function MappingJob(props) {

    const aJob = props.job;

    const onLocalJobViewMore = () => {

        props.onJobViewMore(aJob);
    }

    const onLocalEditJob = () => {

        props.onJobEdit(aJob);
    }

    const onLocalDeleteJob = () => {

        props.onJobDelete(aJob);
    }

    return (
        <div className="card col-md-4 p-3 m-2" style={{ width: '18rem', paddingTop: '10px' }}>
            <img className="card-img-top picture" src={aJob.techCompany.primaryImage.url} alt="ALT TEMPLATE" />
            <div className="card-body text-center mt-2">
                <h5 className="card-salary">$ {aJob.pay}</h5>
                <h6 className="card-title" style={{ textTransform: 'capitalize' }}>{aJob.title}</h6>
                <h5 className="card-dob">{aJob.techCompany.name}</h5>
                <button
                    type="button"
                    className="btn btn-info m-1"
                    id="editButton"
                    onClick={onLocalEditJob}
                >
                    Edit Job
                </button>
                <button
                    type="button"
                    className="btn btn-danger m-1"
                    id="deleteButton"
                    onClick={onLocalDeleteJob}
                >
                    Delete Job
                </button>
                <button
                    type="button"
                    className="btn btn-light m-1"
                    id="viewMoreButton"
                    onClick={onLocalJobViewMore}
                >
                    View More
                </button>
            </div>
        </div>

    );
}

MappingJob.propTypes = {

    job: PropTypes.shape({
        title: PropTypes.string.isRequired,
        pay: PropTypes.number.isRequired,
        techCompany: PropTypes.shape({
            name: PropTypes.string.isRequired,
            primaryImage: PropTypes.shape({
                url: PropTypes.string.isRequired
            })
        })
    }),
    onJobEdit: PropTypes.func.isRequired,
    onJobDelete: PropTypes.func.isRequired,
    onJobViewMore: PropTypes.func.isRequired
};

export default MappingJob;