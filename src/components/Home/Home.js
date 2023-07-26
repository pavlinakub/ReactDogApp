import React, { useState, useRef } from "react";
//import {useEffect} from "react"
import {
  PageContainer,
  DogList,
  DogItem,
  DogForm,
  Input,
  Button,
} from "./HomeStyle";
import dogs from "../../dogsData";
export default function Home() {
  const dogsCount = useRef(dogs.length);

  const [listOfDogs, setListOfDogs] = useState(dogs);
  const [newDog, setNewDog] = useState({
    // id:
    //   listOfDogs.length > 0
    //     ? Math.max(...listOfDogs.map((dog) => dog.id)) + 1
    //     : 1,
    id: dogsCount.current + 1,
    name: "",
    race: "",
    age: "",
  });
  const [valid, setValid] = useState(false);

  //objekt newDog a kdyz do inputu napisu novou hodnotu tak ta mi spusti handle change, target vi ktery input jde a zmenim hodnotu daneho inputu
  const handleChange = (e) => {
    const updateDog = { ...newDog, [e.target.name]: e.target.value };
    setNewDog(updateDog); //ulozeni noveho psa
    validateData(updateDog); //validace noveho psa
  };
  //console.log(newDog);
  //nam zajisti ze se vypise jen jednou v consoli a ne nekolikrat vsechny hodnoty,ale jen te jedne
  // useEffect(() => {
  //   console.log(newDog);
  // }, [newDog]);

  const validateData = (dogV) => {
    if (dogV.age === "" || parseInt(dogV.age) < 0 || parseInt(dogV.age) > 24) {
      return setValid(false);
    } else if (dogV.name.trim().lenght === 0) {
      //pokud je jmeno po odrezani mezer rovna 0
      return setValid(false);
    } else if (dogV.race.trim().lenght === 0) {
      return setValid(false);
    }
    setValid(true);
  };
  //button
  const handleAdd = () => {
    setListOfDogs((listOfDogs) => {
      //vracim nove pole listOfDogs a pridam tam jeste noveho psa
      return [...listOfDogs, newDog];
    });
    // const newId = newDog.id + 1;
    dogsCount.current++;

    const updateDog = {
      id: dogsCount.current + 1,
      name: "",
      race: "",
      age: "",
    };
    setNewDog(updateDog);
    setValid(false);
  };

  return (
    <PageContainer>
      <DogList name="dogList">
        {listOfDogs.map((dog) => {
          return (
            <DogItem key={dog.id}>
              {dog.name} /{dog.race} / {dog.age}
            </DogItem>
          );
        })}
      </DogList>
      <DogForm>
        <Input
          type="text"
          placeholder="jmeno psa"
          name="name"
          value={newDog.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="rasa psa"
          name="race"
          value={newDog.race}
          onChange={handleChange}
        />
        <Input
          type="number"
          placeholder="vek psa"
          name="age"
          min="0"
          max="24"
          value={newDog.age}
          onChange={handleChange}
        />
        <Button disabled={!valid} onClick={handleAdd}>
          Pridat
        </Button>{" "}
        {/* pokud data budou validni tak se disabled nastavi na false /coz znamena ze pujdou ulozit */}
      </DogForm>
    </PageContainer>
  );
}
