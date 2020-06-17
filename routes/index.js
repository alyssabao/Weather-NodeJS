var express = require('express');
var router = express.Router();
const getGeocode = require("../utils/getGeocode")
const getForecast = require("../utils/getForecast")

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    console.log(req.query)
    const {city} = req.query
    console.log(city)
    if(!city) {
    return res.render('index', {title:`Alyssa's Weather App`});
    }
    const location = await getGeocode(city)
    console.log(location)
    const forecast = await getForecast(location.geometry.coordinates)
    console.log(forecast.hourly)
    return res.render('index', {
      city_name: location.place_name,
      title:`Alyssa's Weather App`,
      forecast: forecast.current
    });
  } catch(err) {
    next(err)
  }
  
});

module.exports = router;
