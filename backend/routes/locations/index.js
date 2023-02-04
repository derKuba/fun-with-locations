"use strict";

const json = require("../../data/locations.json");

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return json;
  });

  fastify.get("/cities", async function (request, reply) {
    return json.map((item) => item.name);
  });
};
