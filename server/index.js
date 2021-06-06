const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { cloudinary } = require("./utils/cloudinary");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression(`folder:${process.env.CLOUDINARY_UPLOAD_FOLDER}`)
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute();

  const images = resources.map((file) => ({
    publicId: file.public_id,
    url: file.url,
  }));
  res.send(images);
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedRes = await cloudinary.uploader.upload(fileStr, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    console.log({ uploadedRes });
    res.json({ msg: "Upload Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Somethings went wrong" });
  }
});

app.post("/api/remove", async (req, res) => {
  try {
    const image = req.body.image;
    await cloudinary.uploader.destroy(image, (err, result) => {
      console.log({ err });
      console.log({ result });
    });

    res.json({ msg: "Remove Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Somethings went wrong" });
  }
});

const port = process.env.PORT || "3002";
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
