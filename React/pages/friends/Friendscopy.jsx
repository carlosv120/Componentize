import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import * as friendsServices from "../../services/friendsServices"


function Friends() {

	const [pageData, setPageData] = useState({ arrayOfFriends: [], friendComponents: [] });


	useEffect(() => {

		friendsServices.getAll(0, 5).then(onSuccessGetFriends).catch(onErrorGetFriends);

	}, []);


	const onSuccessGetFriends = (data) => {

		var arrayOfFriends = data.item.pagedItems;

		setPageData((previousState) => {

			const pageData = { ...previousState };

			pageData.arrayOfFriends = arrayOfFriends;
			pageData.friendComponents = arrayOfFriends.map(mapFriend)

			return pageData;
		})
	}

	const onErrorGetFriends = (response) => {

		console.log(response);
	}

	const mapFriend = (aFriendObject) => {

		return (

			<div className="card col-md-4 p-3 m-2" style={{ width: '18rem', paddingTop: '10px' }} key={"ListB-" + aFriendObject.id}>
				<img className="card-img-top picture" src={aFriendObject.primaryImage.imageUrl} alt="ALT TEMPLATE" />
				<div className="card-body text-center mt-2">
					<h3 className="card-title" style={{ textTransform: 'capitalize' }}>{aFriendObject.title}</h3>
					<h4 className="card-id">{aFriendObject.bio}</h4>
					<h5 className="card-dob">{aFriendObject.summary}</h5>
					<button type="button" className="btn btn-danger m-1" id="deleteButton" onClick={deleteFriend} >Delete Friend</button>
				</div>
			</div>

		)
	}

	const deleteFriend = () => {

		console.log("delete firing");
	}

	const [show, setShow] = useState(false);

	const toggleState = () => {

		setShow((prevState) => !prevState)

	}


	return (
		<React.Fragment>
			<div className="container text-center">

				<h4 className="text-center" style={{ textTransform: 'capitalize' }}>
					Friends: {String(show)}
				</h4>

				<div>
					<button
						type="submit"
						className="btn marg btn-primary mb-3"
						id="submitButton"
						onClick={toggleState}>
						Toggle Friends
					</button>
				</div>

				<div className="row justify-content-center">
					{show && pageData.friendComponents}
				</div>

			</div>
		</React.Fragment>
	)

}

export default Friends