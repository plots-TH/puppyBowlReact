//In your index.js file, write a function to fetch the all the players from the API

const cohortName = "2412-FTB-ET-WEB-FT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

export { cohortName };

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`
    );
    const result = await response.json();
    return result.data.players;
  } catch (err) {
    console.error("uh oh, trouble fetching players!", err);
    return [];
  }
};

const removePlayer = async (playerId) => {
  fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`, {
    method: "DELETE",
  });
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${playerId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};
export { removePlayer };

export default fetchAllPlayers;
