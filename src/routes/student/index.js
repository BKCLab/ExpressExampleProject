const express = require("express");
const router = express.Router();
const { createStudentSchema, updateStudentSchema } = require("./schema");
const { Collections, connection } = require("../../db");

router.get("/", async (req, res, next) => {
  try {
    // TODO:  pagination
    const col = (await connection).db().collection(Collections.STUDENTS);
    const docs = await col.find({}).toArray();
    return res.json(docs);
  } catch (e) {
    next(e);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const col = (await connection).db().collection(Collections.STUDENTS);
    const doc = await col.findOne({ studentId });
    if (!doc) return res.status(400).json("Student does not exist!");
    else return res.json(doc);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = createStudentSchema.parse(req.body);
    const col = (await connection).db().collection(Collections.STUDENTS);
    const doc = await col.findOne({ studentId: payload.studentId });
    if (doc) return res.status(400).json("Student already exists!");
    const result = await col.insertOne(payload);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const payload = createStudentSchema.parse(req.body);
    const col = (await connection).db().collection(Collections.STUDENTS);
    const doc = await col.findOne({ studentId: payload.studentId });
    if (!doc) return res.status(400).json("Student does not exist!");
    const result = await col.replaceOne({ studentId: payload.studentId }, payload);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const payload = updateStudentSchema.parse(req.body);
    const col = (await connection).db().collection(Collections.STUDENTS);
    const doc = await col.findOne({ studentId: payload.studentId });
    if (!doc) return res.status(400).json("Student does not exist!");
    const result = await col.updateOne({ studentId: payload.studentId }, { $set: payload });
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

router.delete("/:studentId", async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const col = (await connection).db().collection(Collections.STUDENTS);
    const result = await col.deleteOne({ studentId: studentId });
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
