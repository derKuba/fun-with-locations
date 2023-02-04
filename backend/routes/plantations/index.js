"use strict";

const json = require("../../data/plantations.json");

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return json;
  });
};
