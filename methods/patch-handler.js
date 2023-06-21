const { sendSuccess, sendError } = require("../utils/request-handlers");
const Joi = require("joi");
const MovieModel = require("../models/movies.js");

const patchHandler = (req, res) => {
  const { url } = req;
  const regex = /^\/api\/update-movie-patch\/(.+)$/;

  if (regex.test(url)) {
    updateMoviePatch(req, res);
  }
};

const updateMoviePatch = async (req, res) => {
  try {
    const urlArray = req.url.split("/");
    const movieId = urlArray[urlArray.length - 1];
    if (movieId != "") {
      const movie = await MovieModel.findByPk(movieId);
      if (movie) {
        const schema = Joi.object({
          title: Joi.string().optional(),
          year: Joi.string().optional(),
          genre: Joi.string().optional(),
          rating: Joi.number().optional().min(0).max(10),
        }).min(1);

        let dataString = "";
        req.on("data", (chunk) => {
          dataString += chunk.toString();
        });
        req.on("end", async () => {
          const data = JSON.parse(dataString);
          //   validation
          if (data) {
            const { error, value } = schema.validate(data);
            if (error) {
              return sendError(res, 400, error.details[0].message);
            }

            Object.keys(value).forEach((field) => {
              movie[field] = value[field];
            });

            await movie.save();

            return sendSuccess(res, 200, "Movie updated successfully", movie);
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

module.exports = patchHandler;
