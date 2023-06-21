const { sendSuccess, sendError } = require("../utils/request-handlers");
const Joi = require("joi");
const MovieModel = require("../models/movies.js");

const putHandler = (req, res) => {
  const { url } = req;
  const regex = /^\/api\/update-movie\/(.+)$/;

  if (regex.test(url)) {
    handleUpdateMovie(req, res);
  }
};

const handleUpdateMovie = async (req, res) => {
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
        const schema = Joi.object({
          title: Joi.string().required(),
          year: Joi.string().required(),
          genre: Joi.string().required(),
          rating: Joi.string().required(),
        });
        let dataString = "";
        req.on("data", (chunk) => {
          dataString += chunk.toString();
        });
        req.on("end", async () => {
          const data = JSON.parse(dataString);
          //   validation
          if (data) {
            const { error } = schema.validate(data);
            if (error) {
              return sendError(res, 400, error ? error.details[0].message : "");
            }
            // updating is_logged_in value in DB
            movie.title = data.title;
            movie.year = data.year;
            movie.genre = data.genre;
            movie.rating = data.rating;
            await movie.save();
            return sendSuccess(res, 200, "Movie updated successfully", data);
          }
        });
      } else {
        return sendError(res, 400, "Movie doesn't exists");
      }
    } else {
      return sendError(res, 400, "Enter a valid movie id");
    }
  } catch (error) {
    return sendError(res, 400, error ? "some error occured" : "");
  }
};

module.exports = putHandler;
