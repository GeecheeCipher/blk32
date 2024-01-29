const client = require("./client");
const util = require("util");

// const REPLACE_ME = "HELP REPLACE ME!!!!";

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  try {
    const { rows: videoGames } = await client.query(REPLACE_ME);
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
  const { name, description, price, inStock, isPopular, imgUrl } = body;
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `INSERT INTO videogames(name, description, price, "inStock", "isPopular", "imgUrl")
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
      [name, description, price, inStock, isPopular, imgUrl]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, { title, description, release_date }) {
  try {
    const {
      rows: [updatedVideoGame],
    } = await client.query(
      `
            UPDATE videoGames
            SET title = $1, description = $2, release_date = $3
            WHERE id = $4
            RETURNING *;
        `,
      [title, description, release_date, id]
    );

    return updatedVideoGame;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  try {
    await client.query(
      `
            DELETE FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );

    // No need to return anything for a successful deletion
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
