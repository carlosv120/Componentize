import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as friendsServices from "../../services/friendsServices"

import MappingFriend from "./Mapper";

import Pagination from 'rc-pagination';

import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";


function Friends() {

	const [pageData, setPageData] = useState({ arrayOfFriends: [], friendsComponents: [] });

	const [pageCallData, setPageCallData] = useState({ pageIndex: 0, pageSize: 1 });

	const [paginationFunction, setPaginationFunction] = useState({ current: 1, pageSize: 0, total: 1 })


	useEffect(() => {

		friendsServices.getAll(pageCallData.pageIndex, pageCallData.pageSize).then(onSuccessGetFriends).catch(onErrorGetFriends);

	}, [pageCallData]);

	const onSuccessGetFriends = (data) => {

		var arrayOfFriends = data.item.pagedItems;


		setPageData((previousState) => {

			const pageData = { ...previousState };

			pageData.arrayOfFriends = arrayOfFriends;
			pageData.friendsComponents = arrayOfFriends.map(mapFriend)

			return pageData;
		})

		setPaginationFunction((prevState) => {

			const newState = { ...prevState };

			newState.total = data.item.totalCount;

			return newState

		})
	}
	const onErrorGetFriends = (response) => {

		console.log(response);
	}


	const mapFriend = (aFriendObject) => {

		return (

			<MappingFriend
				friend={aFriendObject}
				key={"ListB-" + aFriendObject.id}
				onFriendDelete={deleteRequested}
				onFriendEdit={editRequested}>
			</MappingFriend>

		)
	}


	const deleteRequested = (aFriend) => {

		var friendId = aFriend.id //id of the friend to be deleted.

		//first deletes from the server, and then from the dom only in the success response

		const handler = getDeleteSuccessHandler(friendId);

		friendsServices.deleteFriend(friendId).then(handler).catch(onErrorDeleteFriend)

	}

	const getDeleteSuccessHandler = (idToBeDeleted) => {

		console.log("getDeleteSuccessHandler", idToBeDeleted);

		return () => {

			console.log("onDeleteSuccess", idToBeDeleted);

			setPageData(prevState => {

				var pageData = { ...prevState }; //copying both objects from the state
				pageData.arrayOfFriends = [...pageData.arrayOfFriends];
				//bringing my previous state and setting it up to a new array.

				const indexOfFriend = pageData.arrayOfFriends.findIndex(friend => {

					var result = false;

					if (friend.id === idToBeDeleted) {
						result = true;
					}
					return result

				});
				//this uses a function similar to filter, if something is true
				//the function is going to return an index >=0
				//the index of the element to delete within the array


				if (indexOfFriend >= 0) {


					//start at the index found and delete that element
					pageData.arrayOfFriends.splice(indexOfFriend, 1);
					pageData.friendsComponents = pageData.arrayOfFriends.map(mapFriend);

					//map the function again without the deleted value.
				}


				return pageData; //could be another name.
			})


		}
	}

	const onErrorDeleteFriend = (error) => {

		console.log(error);

	}


	const editRequested = (aFriend) => {

		const targetPageEdit = `/friends/${aFriend.id}`

		const stateToBeSent = { type: "FRIEND_EDIT", payload: aFriend }

		navigate(targetPageEdit, { state: stateToBeSent });


	}



	const [showFriends, setShowFriends] = useState(false);

	const toggleShowFriends = (event) => {
		event.preventDefault();

		setShowFriends((prevState) => !prevState);
	};


	const [showInfo, setShowInfo] = useState(false);
	const toggleShowInfo = (event) => {
		event.preventDefault();

		setShowInfo((prevState) => !prevState);
	};

	const navigate = useNavigate();

	const goToAddFriend = (event) => {
		event.preventDefault();

		const targetPage = event.currentTarget.dataset.page;

		navigate(targetPage);
	}

	const goToSearchFriend = (event) => {

		event.preventDefault();

		const targetPage = event.currentTarget.dataset.page;

		navigate(targetPage)

	}

	const onFormPageData = (event) => {

		const target = event.target;

		const valueOfTheField = target.value;

		const nameOfTheFormField = target.name;


		setPageCallData((previousState) => {

			const newState = { ...previousState };

			if (nameOfTheFormField === "pageIndex") {

				previousState[nameOfTheFormField] = Number(valueOfTheField) + 1;
			}

			previousState[nameOfTheFormField] = valueOfTheField;

			return newState
		})

		setPaginationFunction((previousState) => {
			const newState = { ...previousState };

			previousState.pageSize = Number(pageCallData.pageSize);

			return newState;
		})


	}

	const onChange = (page) => {
		//onChange receives a page number from the pagination function.

		setPaginationFunction((previousState) => {

			const newState = { ...previousState };

			newState.current = page;


			return newState
		});

		setPageCallData((previousState) => {

			const newState = { ...previousState };

			newState.pageIndex = page - 1;

			return newState;
		})

	};


	return (
		<React.Fragment>
			<div className="container" style={{ backgroundColor: 'rgb(131 199 182)', paddingTop: "12px" }}>
				<form className="form-inline">
					<div className="row" style={{ marginTop: "15px" }}>

						<div className="col-3" style={{ textTransform: 'capitalize' }}>
							<h4 className="text-center" >
								Friends: {String(showFriends)}
							</h4>
						</div>

						<div className="col-3">
							<button
								type="submit"
								className="btn btn-success"
								id="addFriend"
								onClick={goToAddFriend}
								data-page="/friends/new"
							>
								Add Friends
							</button>


						</div>

						<div className="col-3">
							<button
								type="submit"
								className="btn btn-primary"
								id="toggleFriends"
								onClick={toggleShowInfo}>
								Toggle Friends
							</button>
						</div>

						<div className="col-3">
							<div className="form-group marginb-15">
								<button
									type="submit"
									className="btn marg btn-secondary"
									id="searchFriend"
									onClick={goToSearchFriend}
									data-page="/friends/search"
								>
									Search Friend
								</button>
							</div>
						</div>
					</div>
				</form>

			</div>





			<div className="container text-center">
				<div className="row justify-content-center">
					{showInfo &&

						<div className="container">
							<div className="row justify-content-center" style={{ backgroundColor: 'rgb(131 199 182)' }}>
								<div className=" col-6 rounded-3">
									<form>
										<div className="row">
											<h3 className="text-center margint-15">Index Information</h3>

											<div className="col">
												<div className="form-group marginb-15 col-12" >
													<h5 style={{ marginBottom: "2px" }}>Page Index</h5>
													<input
														type="text"
														className="form-control"
														id="pageIndex"
														name="pageIndex"
														placeholder="Enter the page index"
														onChange={onFormPageData}>
													</input>
												</div>
											</div>

											<div className="col">
												<div className="form-group marginb-15 col-12" >
													<h5 style={{ marginBottom: "2px" }}>Page Size</h5>
													<input
														type="text"
														className="form-control"
														id="pageSize"
														name="pageSize"
														placeholder="Enter the page size"
														onChange={onFormPageData}>
													</input>
												</div>

											</div>
										</div>
										<div className="form-group text-center marginb-15">

											<button
												type="submit"
												className="btn marg btn-warning"
												id="submitButton"
												onClick={toggleShowFriends}>
												Show Friends
											</button>

										</div>

									</form>
									<div className="row justify-content-center" >
										{showFriends && <Pagination
											style={{ marginBottom: "20px" }}
											onChange={onChange}
											current={paginationFunction.current}
											total={paginationFunction.total}
											pageSize={paginationFunction.pageSize}
											locale={locale}
										/>}
									</div>


								</div>
							</div>
						</div>}
				</div>


				<div className="row justify-content-center" style={{ backgroundColor: 'rgb(131 199 182)', paddingBottom: "20px" }}>
					{showInfo && showFriends && pageData.friendsComponents}
				</div>


			</div>
		</React.Fragment >
	)

}

export default Friends