import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllPlayers from "./AllPlayers";
import SinglePlayer from "./SinglePlayer";
import NewPlayerForm from "./NewPlayerForm";
import fetchAllPlayers from "../API"; // importing 'fetchAllPLayers' function from API to get player data

function Main() {
  // store the list of players. Declare a state variable called 'players' and a function 'setPlayers' to update it. initialize 'players' as an empty array.
  const [players, setPlayers] = useState([]);

  // create an async function that calls fetchAllPlayers() to retrieve the latest player list.
  const updatePlayerList = async () => {
    const updatedList = await fetchAllPlayers();
    // set players in useState to the newest player list so the updated list gets displayed on the webpage
    setPlayers(updatedList);
  };

  return (
    <div id="main-section">
      <Routes>
        {/*route to AllPlayers "page" aka "home page" pass in the AllPlayers component as the element to be rendered
        Pass in the 'players' and 'updatePlayerList props so AllPlayers has access to the player list and the function that updates the list */}
        <Route
          path="/"
          element={
            <AllPlayers players={players} updatePlayerList={updatePlayerList} />
          }
        />
        {/*route to SinglePlayer "page" */}
        <Route path="/players/:id" element={<SinglePlayer />} />
        {/*route to NewPlayerForm "page" - pass updatePlayerList as a prop */}
        <Route
          path="/new-player"
          element={<NewPlayerForm updatePlayerList={updatePlayerList} />}
        />
      </Routes>
    </div>
  );
}

export default Main;
