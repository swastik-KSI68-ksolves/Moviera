const { sendSuccess, sendError } = require("../utils/request-handlers");
const Joi = require("joi");
const MovieModel = require("../models/movies.js");

const postHandler = (req, res) => {
  const { url } = req;
  if (url === "/api/add-movie") {
    handleAddMovie(req, res);
  }
};

const handleAddMovie = (req, res) => {
  try {
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
        const options = {
          where: {
            title: data.title,
            genre: data.genre,
          },
        };
        const movie = await MovieModel.findOne(options);
        if (movie) {
          return sendError(res, 400, "this movie already exist");
        }
        const newMovie = await MovieModel.create(data);
        if (newMovie) {
          return sendSuccess(res, 200, "Movie added successfully", data);
        }
      }
    });
  } catch (error) {
    return sendError(res, 400, error ? "some error occured" : "");
  }
};

module.exports = postHandler;
