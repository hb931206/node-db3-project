const db = require("../data/config");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
}

function findSteps(id) {
  return db("steps")
    .innerJoin("schemes", "schemes.id", "steps.scheme_id")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .where({ scheme_id: id });
}

function add(schemeData) {
  return db("schemes").insert(schemeData);
}

function update(changes, id) {
  return db("schemes").where({ id }).update(changes);
}

function remove(id) {
  return db("schemes").where({ id }).del();
}

function addStep(step, scheme_id) {
  return db("steps")
    .innerJoin("schemes", "steps.schemes_id")
    .select("steps.id", "schemes.scheme_name", "steps.instructions")
    .where({ id: scheme_id })
    .insert({ ...step, scheme_id });
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep,
};
