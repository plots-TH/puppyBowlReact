import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cohortName } from "../API";

// pass updatedPlayerList prop into NewPlayerForm function so it is available for use later
const NewPlayerForm = ({ updatePlayerList }) => {
  //declare state variables and functions to update them. Each state variable represents a piece of data for the new-player object when it gets created
  const [playerName, setPlayerName] = useState("");
  const [playerBreed, setPlayerBreed] = useState("");
  const [playerStatus, setPlayerStatus] = useState("bench");
  const [errorMessage, setErrorMessage] = useState("");
  // useState with default value of '[]' to set the 'imageOptions' array equal to an empty array.
  const [imageOptions, setImageOptions] = useState([]);
  // declare a default image const that is assinged to a fallback image url
  const defaultImage =
    "https://learndotresources.s3.amazonaws.com/workshop/60ad725bbe74cd0004a6cba0/puppybowl-default-dog.png";

  const navigate = useNavigate();

  useEffect(() => {
    // fetch the list of players from the API and store them in a const called 'result'
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`
        );
        const result = await response.json();
        // log the entire API response to inspect the data received
        console.log("players list:", result);
        console.log("test log:", result.data.players[0].imageUrl);
        // iterate '.map()' through each 'player' in the result.data.players array and set a const to hold all the player images in a new array
        const images = result.data.players.map((player) => player.imageUrl);
        console.log(images);
        // set the 'imageOptions' array equal to all the player images AKA 'const images' using setImageOptions()
        setImageOptions(images);
        // catch block to handle errors
      } catch (err) {
        console.error("Error fetching player images", err);
      }
    };
    // call fetch images function when the component mounts
    fetchImages();
    // place an empty dependancy array so the effect only runs once (prevents infinite loop)
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // create a const randomImage. Use ternary operator. If imageOptions array isn't empty, randomImage = imageOptions['random number'], else use default imageUrl
    const randomImage =
      imageOptions.length > 0
        ? imageOptions[Math.floor(Math.random() * imageOptions.length)]
        : defaultImage;

    // create a new-player object that contains form values which will hold player details when form is submitted
    const newPlayer = {
      name: playerName,
      breed: playerBreed,
      status: playerStatus,
      imageUrl: randomImage,
    };
    // send a POST request to add a new player
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // send the newPlayer object as a JSON
          body: JSON.stringify(newPlayer),
        }
      );

      if (!response.ok) alert("Failed to add player");

      const result = await response.json();
      console.log("New player added:", result.data.player);

      // Update the player list after adding a new player
      await updatePlayerList();

      // Reset form fields after adding new player
      setPlayerName("");
      setPlayerBreed("");
      setPlayerStatus("bench");
      setErrorMessage("");

      // Navigate back to home page after adding player
      navigate("/");
    } catch (err) {
      console.error("Error adding player:", err);
      setErrorMessage("Failed to add player. Try again.");
    }
  };

  // form to fill out/submit a new player. use onChange to set each field input to the corresponding data in newPlayer object. ex: name field will have the value of 'playerName'. onChange => setPlayerName to whatever is typed.
  return (
    <form className="new-player-form" onSubmit={handleSubmit}>
      <h2>Create a New Player</h2>
      {/* if there is an error message, display it using errorMessage*/}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <label htmlFor="playerName">Player Name:</label>
      <input
        type="text"
        id="playerName"
        // assign the input field's value to 'playerName', which is currently an empty string
        value={playerName}
        // use onChange and setPlayerName to update the value of playerName to whatever value is entered
        onChange={(e) => setPlayerName(e.target.value)}
        required
      />

      <label htmlFor="playerBreed">Player Breed:</label>
      <input
        type="text"
        id="playerBreed"
        value={playerBreed}
        onChange={(e) => setPlayerBreed(e.target.value)}
        required
      />

      <label htmlFor="playerStatus">Player Status:</label>
      {/* use select tag to create drop-down menu for either bench or field */}
      <select
        id="playerStatus"
        value={playerStatus}
        onChange={(e) => setPlayerStatus(e.target.value)}
      >
        <option value="bench">Bench</option>
        <option value="field">Field</option>
      </select>

      <button className="submit-player-button" type="submit">
        Add Player
      </button>
    </form>
  );
};

export default NewPlayerForm;
