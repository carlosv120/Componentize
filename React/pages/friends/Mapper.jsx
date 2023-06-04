import React from "react";


function MappingFriend(props) {

    const aFriend = props.friend;

    const onLocalFriendClickedDelete = () => {

        props.onFriendDelete(aFriend)
    }


    const onLocalFriendClickedEdit = () => {

        props.onFriendEdit(aFriend);
    }

    return (
        <div className="card col-md-4 p-3 m-2" style={{ width: '18rem', paddingTop: '10px' }}>
            <img className="card-img-top picture" src={aFriend.primaryImage.url} alt="ALT TEMPLATE" />
            <div className="card-body text-center mt-2">
                <h2 className="card-title" style={{ textTransform: 'capitalize' }}>{aFriend.title}</h2>
                <h4 className="card-headline">{aFriend.headline}</h4>
                <h5 className="card-dob">{aFriend.summary}</h5>
                <h6 className="card-id">{aFriend.bio}</h6>
                <button
                    type="button"
                    className="btn btn-info m-1"
                    id="editButton"
                    onClick={onLocalFriendClickedEdit}>
                    Edit Friend
                </button>

                <button
                    type="button"
                    className="btn btn-danger m-1"
                    id="deleteButton"
                    onClick={onLocalFriendClickedDelete}>
                    Delete Friend
                </button>
            </div>
        </div>

    );
}

export default MappingFriend;