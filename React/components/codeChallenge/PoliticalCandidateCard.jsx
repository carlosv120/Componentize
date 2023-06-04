
import React from "react";



function PoliticalCandidatesCard(props) {

    const politicalCandidate = props.candidate;

    console.log(politicalCandidate);

    return (
        <React.Fragment>
            <div className="card col-md-4 p-3 m-2" style={{ width: '18rem', paddingTop: '10px' }}>
                <img className="card-img-top picture" src={politicalCandidate.imageUrl || politicalCandidate.imageUrl2} alt="ALT TEMPLATE" />
                <div className="card-body text-center mt-2">
                    <h5 className="card-title" style={{ textTransform: 'capitalize' }}>{politicalCandidate.firstName || politicalCandidate.firstName2} {politicalCandidate.lastName || politicalCandidate.lastName2}</h5>
                    <p className="card-id">{politicalCandidate.party || politicalCandidate.party2}</p>
                    <p className="card-dob">{politicalCandidate.currentVotes || politicalCandidate.currentVotes2}</p>
                </div>
            </div>

        </React.Fragment>


    )
}

export default PoliticalCandidatesCard;