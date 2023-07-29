import React, { useState, useRef } from "react";
//import {useEffect} from "react"
import {
  PageContainer,
  DogList,
  DogItem,
  DogForm,
  Input,
  Button,
  Buttons,
  TabButton,
  ShelterForm,
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
  const [activeTab, setActiveTab] = useState("list-of-dogs");
  const [shelterStorage, setShelterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  });
  const [tempStorage, setTempStorage] = useState({
    food: "",
    vaccine: "",
    pills: "",
  });

  //objekt newDog a kdyz do inputu napisu novou hodnotu tak ta mi spusti handle change, target vi ktery input jde a zmenim hodnotu daneho inputu
  const handleChange = (e) => {
    const updateDog = { ...newDog, [e.target.name]: e.target.value };
    setNewDog(updateDog); //ulozeni noveho psa
    validateData(updateDog); //validace noveho psa
  };

  const dogsEequirements = {
    food: 5,
    vaccine: 1,
    pills: 2,
  };
  //console.log(setActiveTab);
  //nam zajisti ze se vypise jen jednou v consoli a ne nekolikrat vsechny hodnoty,ale jen te jedne
  // useEffect(() => {
  //   console.log(newDog);
  // }, [newDog]);

  const handleDelete = (idToDel) => {
    setListOfDogs(listOfDogs.filter((dog) => dog.id !== idToDel));
  };

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
    let pushDog = false;
    const totalRequirements = {
      food: dogsEequirements.food * (listOfDogs.length + 1),
      vaccine: dogsEequirements.vaccine * (listOfDogs.length + 1),
      pills: dogsEequirements.pills * (listOfDogs.length + 1),
    };
    if (
      totalRequirements.food <= shelterStorage.food &&
      totalRequirements.vaccine <= shelterStorage.vaccine &&
      totalRequirements.pills <= shelterStorage.pills
    ) {
      pushDog = true;
    }
    if (pushDog) {
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
    } else {
      alert("nedostatek zasob pro pridani psa");
    }
  };
  const handleStorage = (e) => {
    const updateStorage = { ...tempStorage, [e.target.name]: e.target.value };
    setTempStorage(updateStorage);
  };
  const updateStorage = () => {
    const storageValue = tempStorage;
    let newStorageValue = {};
    const keys = Object.keys(storageValue);
    keys.map((key) => {
      //pokud bude zadana hodnota pricte se k aktualni hodnote =>key===[input.name=[pills,food,vaccine]]
      if (parseInt(storageValue[key])) {
        newStorageValue[key] =
          parseInt(shelterStorage[key]) + parseInt(storageValue[key]);
      } else {
        newStorageValue[key] = parseInt(shelterStorage[key]);
      }
    });
    setShelterStorage(newStorageValue);
    setTempStorage({ food: "", vaccine: "", pills: "" });
  };

  return (
    <PageContainer>
      <Buttons>
        <TabButton
          name="list-of-dogs"
          data-active={activeTab}
          onClick={() => setActiveTab("list-of-dogs")}
        >
          Seznam psu
        </TabButton>
        <TabButton
          name="shelter-storage"
          data-active={activeTab}
          onClick={() => setActiveTab("shelter-storage")}
        >
          Sklad utulku
        </TabButton>
      </Buttons>
      {activeTab === "list-of-dogs" && (
        <>
          {" "}
          <DogList name="dogList">
            {listOfDogs.map((dog) => {
              return (
                <DogItem key={dog.id}>
                  {dog.name} /{dog.race} / {dog.age}
                  <button
                    style={{
                      color: "#64766a",
                      fontWeight: "bolder",
                      border: 2 + "px solid #64766a",
                      borderRadius: 50 + "%",
                      height: 25 + "px",
                      width: 25 + "px",
                    }}
                    onClick={() => handleDelete(dog.id)}
                  >
                    X
                  </button>
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
        </>
      )}
      {activeTab === "shelter-storage" && (
        <>
          <h3>Aktualni zasoby</h3>
          <p>granule:{shelterStorage.food} kg</p>
          <p>vakciny: {shelterStorage.vaccine}ks</p>
          <p>medikamentty:{shelterStorage.pills}ks</p>
          <ShelterForm>
            <Input
              type="number"
              min="0"
              placeholder="granule (kg)"
              name="food"
              value={tempStorage.food}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="vakciny (ks)"
              name="vaccine"
              value={tempStorage.vaccine}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="leky (ks)"
              name="pills"
              value={tempStorage.pills}
              onChange={handleStorage}
            />
            <Button onClick={updateStorage}>Doplnit zasoby</Button>
          </ShelterForm>
        </>
      )}
    </PageContainer>
  );
}
