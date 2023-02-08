const {
  addToLikedMovies,
  getLikedMovie,
  removeFromLikedMovies
} = require("../controllers/UserController");

const router = require("express").Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovie);
router.put("/delete", removeFromLikedMovies);

module.exports = router;
