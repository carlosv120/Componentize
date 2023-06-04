import React from "react";

function MappingCompany(props) {

    const aCompany = props.company;

    const onLocalEditCompany = () => {

        props.onCompanyEdit(aCompany);
    }

    const onLocalCompanyViewMore = () => {

        props.onCompanyViewMore(aCompany);
    }


    //     const onLocalDeleteJob = () => {
    // 
    //         props.onJobDelete(aCompany);
    //     }


    return (
        <div className="card col-md-4 p-3 m-2" style={{ width: '18rem', paddingTop: '10px' }}>
            <img className="card-img-top picture" src={aCompany.primaryImage.url} alt="ALT TEMPLATE" />
            <div className="card-body text-center mt-2">
                <h5 className="card-name">{aCompany.name}</h5>
                <h6 className="card-headline">{aCompany.headline}</h6>
                <button
                    type="button"
                    className="btn btn-info m-1"
                    id="editButton"
                    onClick={onLocalEditCompany}
                >
                    Edit Company
                </button>
                <button
                    type="button"
                    className="btn btn-light m-1"
                    id="viewMoreButton"
                    onClick={onLocalCompanyViewMore}
                >
                    View More
                </button>
            </div>
        </div>

    );
}

export default MappingCompany;