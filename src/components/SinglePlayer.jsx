import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cohortName } from "../API";

function SinglePlayer() {
  // get a hold of the selected player's id from the URL using useParams
  const { id } = useParams();
  //create a const that calls useNavigate() function to be used later
  const navigate = useNavigate();
  // create a function that calls useNavigate() with  the home path: "/" passed inside
  const returnToList = () => {
    navigate("/");
  };

  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null); // handle cases where player data is null/undefined
  const [loading, setLoading] = useState(true); // track the loading state

  useEffect(() => {
    const fetchSinglePlayer = async () => {
      try {
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${id}`
        );
        const result = await response.json();
        console.log(result);

        if (!result.data || !result.data.player) {
          setError("Player not found");
        } else {
          setPlayer(result.data.player);
        }
      } catch (err) {
        setError("Failed to fetch player data", err);
        // use a 'finally block' to execute some code after the try&catch, regardless of any errors
      } finally {
        setLoading(false); // loading is complete and is now set to false
      }
    };

    // call fetchSinglePlayer() function when component mounts
    fetchSinglePlayer();
  }, []);
  // display a loading screen while receiving player data or else the page will immediately render nothing
  // "if loading is truthy, display a paragraph element saying "loading..."
  if (loading) return <p>Loading Player Details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="single-player">
      <h2>{player.name || "No Name"}</h2>
      <p>Date Created: {player.createdAt}</p>
      <p>Player ID: {player.id}</p>
      <p>Team ID: {player.teamId || "No Team"}</p>
      <img src={player.imageUrl} alt={player.name} />
      <p>Team Name: {player.team?.name || "No Team Assigned"}</p>
      <p>Breed: {player.breed || "Unknown Breed"}</p>
      <p>Status: {player.status}</p>
      <button onClick={returnToList}>return to list</button>
    </div>
  );
}

export default SinglePlayer;
