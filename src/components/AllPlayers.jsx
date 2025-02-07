import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchAllPlayers, { removePlayer } from "../API"; // import fetchAllPlayers and removePlayer from API (defined in index.js)

// place the 'players' and updatePlayerList props into AllPlayers so they are available to use
function AllPlayers({ players, updatePlayerList }) {
  // create a const that calls useNavigate() so we can use it later on buttons/links to switch between routes aka "pages"
  const navigate = useNavigate();

  // create a new array with useState to store filtered players. This way the origional 'players' array wont be mutated when we filter/rerender
  const [displayedPlayers, setDisplayedPlayers] = useState([]);

  // call updatePlayerList to fetch the latest players when the page aka component mounts
  useEffect(() => {
    updatePlayerList();
  }, []);

  // set displayedPlayers to players to match the full 'players' array. place players inside the dependency array so all players are displayed initially
  useEffect(() => {
    setDisplayedPlayers(players);
  }, [players]);

  // filter through each player and find only players who's names contain the input value. store in a const called 'searchResults'
  const handleInput = (e) => {
    const searchResults = players.filter((player) =>
      player.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // replace the contents of displayedPlayers array (which currently holds all-players list) with searchResults array
    setDisplayedPlayers(searchResults);
  };

  console.log("players:", players);
  console.log("displayedPlayers:", displayedPlayers);
  return (
    <div className="all-players">
      <h2>All-Players List</h2>

      <label>
        Search:
        <input type="text" onChange={handleInput} />
      </label>

      <button
        // when the button is clicked, navigate to the NewPlayerForm path/page
        onClick={() => navigate("/new-player")}
        className="add-new-player-button"
      >
        Add New Player
      </button>

      {/* iterate through each player in players array and create elements to display the different player data */}
      {displayedPlayers.map((player) => (
        <div key={player.id}>
          <h4>{player.name}</h4>
          <p>Player ID: {player.id}</p>
          <img src={player.imageUrl} alt={`${player.name}'s image`} />
          <p>Breed: {player.breed}</p>
          <button
            // when the button is clicked, navigate to the single-player path/page with the player.id dynamically passed into the Url
            className="see-details-button"
            onClick={() => navigate(`/players/${player.id}`)}
          >
            See Player Details
          </button>
          <button
            className="delete-player-button"
            onClick={async () => {
              // use if(window.confirm("Are you sure?")) {then run delete-button logic here} to display a confirmation pop-up window
              if (
                window.confirm(
                  `Are you sure you want to delete ${player.name}?`
                )
              ) {
                // call remove player with the player's id passed in, then call updatePlayerList() again to display the new list after player-deletion
                await removePlayer(player.id);
                updatePlayerList();
              }
            }}
          >
            Delete Player
          </button>
        </div>
      ))}
    </div>
  );
}

export default AllPlayers;
