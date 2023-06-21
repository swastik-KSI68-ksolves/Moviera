const { sendError, sendSuccess } = require("../utils/request-handlers.js");

const getHandler = (req, res) => {
  const { url, movies } = req;
  const urlArray = url.split("/");
  const movieId = urlArray[urlArray.length - 1];
  const regexPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (url === "/api/movies") {
    sendSuccess(res, 200, "Success", { movies: movies });
  } else if (regexPattern.test(movieId)) {
    const movieIndexInArray = movies.findIndex((movie) => {
      return movie.id == movieId;
    });
    if (movieIndexInArray !== -1) {
      sendSuccess(res, 200, "Success", {
        movies: movies[movieIndexInArray],
      });
    } else {
      sendError(res, 400, "Movie not found with this id");
    }
  } else {
    sendError(res, 404, "Not found");
  }
};

module.exports = getHandler;
