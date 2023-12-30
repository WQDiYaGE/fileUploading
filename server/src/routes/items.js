const upload = require("../middlewares/multer");
const express = require("express");

const { getItems, addItem, viewItem, downloadItem, deleteItem } = require("../controllers/items");


const router = express.Router();

router.route("/").get(getItems).post(upload.single("file"), addItem);
router.route("/download/:id").get(downloadItem);
router.route("/:id").delete(deleteItem);
router.route("/view/:id").get(viewItem);

module.exports = router;
