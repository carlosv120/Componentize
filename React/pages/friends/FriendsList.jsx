import React from "react";


function FriendsList() {

    const people = [
        {
            gender: "female",
            name: { title: "miss", first: "tammy", last: "alexander" },
            location: null,
            email: "tammy.alexander@example.com",
            dob: "1947-09-10 22:41:33",
            registered: "2008-11-28 23:12:46",
            phone: "(857)-925-9849",
            cell: "(550)-273-0637",
            id: { name: "SSN", value: "906-98-6144" },
            picture: {
                large: "https://randomuser.me/api/portraits/women/39.jpg",
                medium: "https://randomuser.me/api/portraits/med/women/39.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/39.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "male",
            name: { title: "mr", first: "aiden", last: "cruz" },
            location: null,
            email: "aiden.cruz@example.com",
            dob: "1948-10-04 07:27:25",
            registered: "2007-04-02 08:54:38",
            phone: "(247)-603-2165",
            cell: "(068)-183-0439",
            id: { name: "SSN", value: "586-36-5399" },
            picture: {
                large: "https://randomuser.me/api/portraits/men/42.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/42.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/42.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "female",
            name: { title: "miss", first: "patsy", last: "cunningham" },
            location: null,
            email: "patsy.cunningham@example.com",
            dob: "1948-03-13 01:07:31",
            registered: "2015-06-11 00:59:26",
            phone: "(375)-143-4833",
            cell: "(246)-471-8581",
            id: { name: "SSN", value: "988-40-0274" },
            picture: {
                large: "https://randomuser.me/api/portraits/women/28.jpg",
                medium: "https://randomuser.me/api/portraits/med/women/28.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/28.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "male",
            name: { title: "mr", first: "enrique", last: "wade" },
            location: null,
            email: "enrique.wade@example.com",
            dob: "1954-01-22 04:40:11",
            registered: "2006-10-20 04:39:13",
            phone: "(651)-983-8786",
            cell: "(324)-438-7607",
            id: { name: "SSN", value: "173-16-2037" },
            picture: {
                large: "https://randomuser.me/api/portraits/men/56.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/56.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/56.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "male",
            name: { title: "mr", first: "alex", last: "herrera" },
            location: null,
            email: "alex.herrera@example.com",
            dob: "1993-08-29 20:04:17",
            registered: "2011-05-24 15:37:36",
            phone: "(865)-281-1703",
            cell: "(754)-324-7391",
            id: { name: "SSN", value: "801-08-7773" },
            picture: {
                large: "https://randomuser.me/api/portraits/men/63.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/63.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/63.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "female",
            name: { title: "miss", first: "bernice", last: "perry" },
            location: null,
            email: "bernice.perry@example.com",
            dob: "1948-06-14 16:33:42",
            registered: "2009-02-09 02:25:24",
            phone: "(647)-211-4605",
            cell: "(917)-564-9706",
            id: { name: "SSN", value: "086-86-7972" },
            picture: {
                large: "https://randomuser.me/api/portraits/women/86.jpg",
                medium: "https://randomuser.me/api/portraits/med/women/86.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/86.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "male",
            name: { title: "mr", first: "jack", last: "oliver" },
            location: null,
            email: "jack.oliver@example.com",
            dob: "1979-10-29 11:14:24",
            registered: "2014-03-27 03:34:23",
            phone: "(233)-711-1521",
            cell: "(960)-359-2818",
            id: { name: "SSN", value: "446-31-6979" },
            picture: {
                large: "https://randomuser.me/api/portraits/men/21.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/21.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/21.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "female",
            name: { title: "mrs", first: "leslie", last: "horton" },
            location: null,
            email: "leslie.horton@example.com",
            dob: "1963-08-01 01:44:19",
            registered: "2008-11-13 20:50:48",
            phone: "(365)-699-2843",
            cell: "(136)-027-1179",
            id: { name: "SSN", value: "600-80-9331" },
            picture: {
                large: "https://randomuser.me/api/portraits/women/77.jpg",
                medium: "https://randomuser.me/api/portraits/med/women/77.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/77.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "male",
            name: { title: "mr", first: "erik", last: "steward" },
            location: null,
            email: "erik.steward@example.com",
            dob: "1975-04-12 17:34:48",
            registered: "2013-12-18 11:21:15",
            phone: "(593)-052-5865",
            cell: "(666)-183-7022",
            id: { name: "SSN", value: "367-83-3311" },
            picture: {
                large: "https://randomuser.me/api/portraits/men/49.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/49.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/49.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
        {
            gender: "female",
            name: { title: "miss", first: "glenda", last: "burns" },
            location: null,
            email: "glenda.burns@example.com",
            dob: "1978-11-19 11:41:35",
            registered: "2008-09-25 11:18:53",
            phone: "(445)-703-2580",
            cell: "(969)-877-5496",
            id: { name: "SSN", value: "380-27-2253" },
            picture: {
                large: "https://randomuser.me/api/portraits/women/41.jpg",
                medium: "https://randomuser.me/api/portraits/med/women/41.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/41.jpg",
            },
            nat: "US",
            hasBeenCloned: false,
        },
    ];


    const mapPerson = (aPersonObject) => {

        return (

            <div className="card text-center col-md-4" style={{ width: '18rem', paddingTop: '10px' }} key={"ListA-" + aPersonObject.id.value}>
                <img className="card-img-top" src={aPersonObject.picture.large} alt="ALT TEMPLATE" />
                <div className="card-body">
                    <h5 className="card-title" style={{ textTransform: 'capitalize' }}>{aPersonObject.name.first} {aPersonObject.name.last}</h5>
                    <p className="card-id">{aPersonObject.id.value}</p>
                    <p className="card-dob">{aPersonObject.dob}</p>
                </div>
            </div>

        )
    }


    return (
        <React.Fragment>
            <div className="container">
                <h4>Friends</h4>

                {/* <div className="row">
                    {arrayOfPeople.map(aPersonObject => <div className="col-1"><strong>{aPersonObject.name}</strong></div>)}
                </div> */}

                {/* This is going to be like the target container where wverything on the mapping function will be rendered */}
                <div className="row justify-content-center">
                    {people.map(mapPerson)}
                </div>

            </div>
        </React.Fragment>
    )
}

export default FriendsList