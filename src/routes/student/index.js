const express = require("express");
const router = express.Router();

const connection = require("../../db");
const { STUDENT_PROFILE } = require("../../constance/db-collections-name");
const { authen, author } = require("../access-control/protect-middleware");
const { ROLE } = require("../access-control/role");
const { validate } = require("../common/utils");
const { InputDataInvalid } = require("../../errors/errors");
const { studentProfileSchema } = require("./schema");

const multer = require("multer");
const { config } = require("../../config");
// const { uploadFile } = require("../../gg-cloud-storage");
const upload = multer({ limits: { fieldSize: 10000000 } });

router.get("/", async (req, res, next) => {
  try {
    // TODO:  pagination
    const col = (await connection).db().collection(STUDENT_PROFILE);
    const docs = await col.find({}).toArray();
    return res.json(docs);
  } catch (e) {
    next(e);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const col = (await connection).db().collection(STUDENT_PROFILE);
    const doc = await col.findOne({ studentId });
    if (!doc) return res.status(400).json("student's profile does not exist!");
    else return res.json(doc);
  } catch (e) {
    next(e);
  }
});

router.post("/", authen, author([ROLE.Admin]), upload.single("avatar"), async (req, res, next) => {
  try {
    const data = req.body;
    const errs = validate(data, studentProfileSchema);
    if (errs) throw new InputDataInvalid({ message: JSON.stringify(errs) });

    const col = (await connection).db().collection(STUDENT_PROFILE);
    const doc = await col.findOne({ studentId: data.studentId });
    if (doc) return res.status(400).json("Student has already existed!");
    let avatarImg = null;
    if (req.file) {
      // const fileDestName = `avatar/${Date.now()}-${req.file.originalname}`;
      // await uploadFile(req.file.buffer, fileDestName);
      // avatarImg = encodeURI(`https://storage.googleapis.com/${config.BUCKET_NAME}/${fileDestName}`);
      await col.insertOne({ ...data, avatarImg });
    } else {
      await col.insertOne(data);
    }

    return res.json("ok");
  } catch (e) {
    next(e);
  }
});

router.put("/:studentId", authen, author([ROLE.Admin]), upload.single("avatar"), async (req, res, next) => {
  try {
    const data = req.body;
    const errs = validate(data, studentProfileSchema);
    if (errs) throw new InputDataInvalid({ message: JSON.stringify(errs) });

    const studentId = req.params.studentId;
    if (studentId !== data.studentId) return res.status(400).json("studentId is not match!");

    const col = (await connection).db().collection(STUDENT_PROFILE);
    const doc = await col.findOne({ studentId: data.studentId });
    if (!doc) return res.status(400).json("Student does not exist!");

    let avatarImg = null;
    if (req.file) {
      // const fileDestName = "avatar/" + `${Date.now()}-${req.file.originalname}`;
      // await uploadFile(req.file.buffer, fileDestName);
      // avatarImg = encodeURI(`https://storage.googleapis.com/${config.BUCKET_NAME}/${fileDestName}`);
      await col.replaceOne({ studentId: data.studentId }, { ...data, avatarImg });
    } else {
      await col.replaceOne({ studentId: data.studentId }, data);
    }

    return res.json("ok");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
