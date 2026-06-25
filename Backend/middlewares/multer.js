import multer from "multer";
import crypto from "crypto";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, `${crypto.randomUUID()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
