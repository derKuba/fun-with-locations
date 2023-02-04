"use strict";

const plantationsData = require("../../data/plantations.json");
const locationsData = require("../../data/locations.json");

// https://www.geodatasource.com/developers/javascript
const distance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

const findCity = (city) => locationsData.filter((item) => item.name === city);

const getThreeNearestPlaces = (latitude, longitude) => {
  const arr = [];

  plantationsData.forEach((plantage) => {
    const distanceInKm = distance(
      latitude,
      longitude,
      plantage.latitude,
      plantage.longitude
    );

    arr.push({
      id: plantage.id,
      dist: distanceInKm.toFixed(2),
      name: plantage.location,
    });

    if (arr.length > 3) {
      arr.sort(function (a, b) {
        return a.dist - b.dist;
      });
      arr.pop();
    }
  });

  return arr;
};

module.exports = async function (fastify, opts) {
  fastify.get("/:city", async function (request, reply) {
    const { city } = request.params;

    if (city === undefined) {
      return fastify.httpErrors.notFound();
    }

    const cityDetails = findCity(city);

    if (cityDetails.length === 0) {
      return fastify.httpErrors.notFound();
    }

    const { latitude, longitude } = cityDetails[0];

    return getThreeNearestPlaces(latitude, longitude);
  });
};
