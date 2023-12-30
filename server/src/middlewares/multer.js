const multer = require("multer");
const { format } = require("date-fns");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "C:/Users/Dell/Desktop/fileUploading/server/src/uploads/");
    },
    filename: function(req, file, cb) {
        const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
        const newFilename = timestamp + '_' + file.originalname;
        
        console.log("New Filename: ", newFilename);
        cb(null, newFilename);
        // cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"  || file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports = upload;