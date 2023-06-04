import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import PetsCard from "./PetsCard"



function PetsList() {


    const pets = [{ type: "horse", name: "Bella", age: 5 }, { type: "dog", name: "Max", age: 3 }, { type: "Cat", name: "Tom", age: 8 }, { type: "dog", name: "Lucy", age: 6 }]

    const [allAnimals, setAllAnimals] = useState({ arrayOfAnimals: [], animalsComponents: [] })


    const [Dogs, setDogs] = useState({ arrayOfDogs: [], dogsComponents: [] })
    const [showDogs, setShowDogs] = useState(false);



    useEffect(() => {


        setAllAnimals((previousState) => {

            const newState = { ...previousState }

            newState.arrayOfAnimals = pets;

            newState.animalsComponents = pets.map(mapAnimal)

            return newState
        })

    }, [])

    const mapAnimal = (animalObject) => {

        return (
            <PetsCard
                pets={animalObject}
                key={"ListH-" + animalObject.name}
            >
            </PetsCard>

        )

    }

    const onFilterDogs = () => {

        setDogs((previousState) => {

            const newState = { ...previousState };

            newState.arrayOfDogs = pets.filter(petObject => petObject.type === "dog")

            newState.dogsComponents = newState.arrayOfDogs.map(mapAnimal);

            return newState;
        })

        setShowDogs(() => !showDogs)


    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <button
                        type="submit"
                        className="btn btn-primary m-3"
                        id="showingPresidents"
                        onClick={onFilterDogs}
                    >
                        Show Dogs
                    </button>
                </div>


            </div>


            <div className="row">
                {!showDogs && allAnimals.animalsComponents}
                {showDogs && Dogs.dogsComponents}
            </div>

        </div>

    )
}

export default PetsList;