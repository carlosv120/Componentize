import React from "react";

import { useState } from "react";
import { useEffect } from "react";

import * as carService from "./services/carService"

import SingleCar from "./SingleCar";

function Cars() {

    const [allCars, setAllCars] = useState({ arrayOfCars: [], carsComponents: [] });
    const [showAllCars, setShowAllCars] = useState(false);

    const [cars2018, setCars2018] = useState({ arrayOfCars: [], carsComponents: [] });
    const [showCars2018, setshowCars2018] = useState(false);

    const [cars2019, setCars2019] = useState({ arrayOfCars: [], carsComponents: [] });
    const [showCars2019, setshowCars2019] = useState(false);

    const [cars2020, setCars2020] = useState({ arrayOfCars: [], carsComponents: [] });
    const [showCars2020, setshowCars2020] = useState(false);


    const [cars2021, setCars2021] = useState({ arrayOfCars: [], carsComponents: [] });
    const [showCars2021, setshowCars2021] = useState(false);

    const [singleCar, setSingleCar] = useState({ currentCar: [], carComponents: [] })
    const [showSingleCar, setshowSingleCar] = useState(false);


    useEffect(() => {

        carService.getAll().then(onGetAllSuccess).catch(onGetAllError);

    }, [])


    const onGetAllSuccess = (response) => {

        var arrayOfCars = response.data;

        for (let i = 0; i < arrayOfCars.length; i++) {
            const currentCar = arrayOfCars[i];
            currentCar.id = Math.floor(Math.random() * 10000000);
        }

        setAllCars((previousState) => {

            const newState = { ...previousState };

            newState.arrayOfCars = arrayOfCars;
            newState.carsComponents = arrayOfCars.map(mapCar);

            return newState
        })
    }
    const onGetAllError = (error) => { console.log("error", error); }


    const mapCar = (aCarObject) => {

        return (
            <SingleCar
                car={aCarObject}
                key={"CarA-" + aCarObject.id}
                showButton={true}
                onCarClicked={onClickSelectMe}
            ></SingleCar>

        )
    }


    const onShowCars = (event) => {

        const buttonId = event.currentTarget.id;

        setshowSingleCar(() => false)

        if (buttonId === "show-all") {

            setShowAllCars(() => !showAllCars);

            setshowCars2018(() => false);
            setshowCars2019(() => false);
            setshowCars2020(() => false);
            setshowCars2021(() => false);

        }
        else if (buttonId === "show-2018-cars") {

            setCars2018((previousState) => {

                const newState = { ...previousState }

                newState.arrayOfCars = allCars.arrayOfCars.filter(aCar => aCar.year === 2018);

                newState.carsComponents = newState.arrayOfCars.map(mapCar);

                return newState
            })

            setshowCars2018(() => !showCars2018);

            setShowAllCars(() => false);
            setshowCars2019(() => false);
            setshowCars2020(() => false);
            setshowCars2021(() => false);

        }
        else if (buttonId === "show-2019-cars") {

            setCars2019((previousState) => {

                const newState = { ...previousState }

                newState.arrayOfCars = allCars.arrayOfCars.filter(aCar => aCar.year === 2019);

                newState.carsComponents = newState.arrayOfCars.map(mapCar);

                return newState
            })

            setshowCars2019(() => !showCars2019)


            setShowAllCars(() => false);
            setshowCars2018(() => false);
            setshowCars2020(() => false);
            setshowCars2021(() => false);

        }
        else if (buttonId === "show-2020-cars") {

            setCars2020((previousState) => {

                const newState = { ...previousState }

                newState.arrayOfCars = allCars.arrayOfCars.filter(aCar => aCar.year === 2020);

                newState.carsComponents = newState.arrayOfCars.map(mapCar);

                return newState
            })

            setshowCars2020(() => !showCars2020)

            setShowAllCars(() => false);
            setshowCars2018(() => false);
            setshowCars2019(() => false);
            setshowCars2021(() => false);
        }
        else if (buttonId === "show-2021-cars") {

            setCars2021((previousState) => {

                const newState = { ...previousState }

                newState.arrayOfCars = allCars.arrayOfCars.filter(aCar => aCar.year === 2021);

                newState.carsComponents = newState.arrayOfCars.map(mapCar);

                return newState
            })

            setshowCars2021(() => !showCars2021)

            setShowAllCars(() => false);
            setshowCars2018(() => false);
            setshowCars2019(() => false);
            setshowCars2020(() => false);
        }



    }


    const onClickSelectMe = (aCarObject) => {

        setSingleCar((previousState) => {

            const newState = { ...previousState };

            newState.currentCar = aCarObject;

            newState.carComponents = mapSideCard(newState.currentCar)

            return newState;
        })

        setshowSingleCar(() => true)

    }

    const mapSideCard = (aCar) => {

        return (
            <SingleCar
                car={aCar}
                key={"CarA-" + aCar.id}
                showButton={false}
                onCarClicked={onClickSelectMe}
            ></SingleCar>

        )
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <button
                        type="button"
                        className="btn btn-primary m-3"
                        id="show-all"
                        onClick={onShowCars}
                    >
                        Show Cars
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary m-3"
                        id="show-2018-cars"
                        onClick={onShowCars}
                    >
                        2018 Cars
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary m-3"
                        id="show-2019-cars"
                        onClick={onShowCars}
                    >
                        2019 Cars
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary m-3"
                        id="show-2020-cars"
                        onClick={onShowCars}
                    >
                        2020 Cars
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary m-3"
                        id="show-2021-cars"
                        onClick={onShowCars}
                    >
                        2021 Cars
                    </button>
                </div>
            </div>


            <div className="row">
                <div className="col-4">
                    {showAllCars && allCars.carsComponents}
                    {showCars2018 && cars2018.carsComponents}
                    {showCars2019 && cars2019.carsComponents}
                    {showCars2020 && cars2020.carsComponents}
                    {showCars2021 && cars2021.carsComponents}
                </div>

                <div className="col-8 text-center">
                    {showSingleCar && singleCar.carComponents}
                </div>
            </div>

        </div>

    )
}

export default Cars

