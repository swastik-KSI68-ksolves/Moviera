const { sendSuccess, sendError } = require("../utils/request-handlers");
const Joi = require("joi");
const MovieModel = require("../models/movies.js");

const deleteHandler = (req, res) => {
  const { url } = req;
  const regex = /^\/api\/delete-movie\/(.+)$/;

  if (regex.test(url)) {
    handleDeleteMovie(req, res);
  }
};

const handleDeleteMovie = async (req, res) => {
  try {
    const urlArray = req.url.split("/");
    const movieId = urlArray[urlArray.length - 1];
    if (movieId != "") {
      const options = {
        where: {
          id: movieId,
        },
      };
      const movie = await MovieModel.findOne(options);
      if (movie) {
        await movie.destroy();
        return sendSuccess(res, 200, "Movie deleted successfully");
      } else {
        return sendError(res, 400, "Movie doesn't exists");
      }
    }
    return sendError(res, 400, "Please provide a movie ID");
  } catch (error) {
    return sendError(res, 400, error ? "some error occured" : "");
  }
};

module.exports = deleteHandler;
