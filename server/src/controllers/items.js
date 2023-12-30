const Item = require("../models/Item");


const path = require("path");
const fs = require("fs");

const asyncWrapper = require("../middlewares/asyncWrapper");

const getItems = async (req, res) => {
    try{
        const items = await Item.find();
        res.status(200).json({ items });

    } catch(error) {
        console.log(error);
    }
};


const addItem = asyncWrapper( async (req, res) => {
    const { moduleName, title, dueDate, submittedDate, submittionStatus } = req.body;
    const file = req.file.path;

    const item = await Item.create({
        moduleName, 
        title, 
        dueDate, 
        submittedDate, 
        submittionStatus, 
        file 
    });
    res.status(200).json({ item });
});

const viewItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId);

        if(!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const filePath = item.file;
        res.sendFile(filePath);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const downloadItem = asyncWrapper( async (req, res, next) => {
    const itemId = req.params.id;
    
    try{
        const item = await Item.findById({_id: itemId});
        if(!item){
            return next(new Error("No item found"));
        }

        const file = item.file;
        
        
        if(fs.existsSync(file)) {
            const fileName = item.name;
            const contentDispositionHeader = `attachment; filename="${fileName}"`;
            res.setHeader('Content-Disposition', contentDispositionHeader);

            console.log("Content-Disposition Header: ", contentDispositionHeader);
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

            const fileExtension = path.extname(file).toLowerCase();
            let contentType = 'application/octet-stream'; // Default to octet-stream

            if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
                contentType = 'image/jpeg';
            } else if (fileExtension === '.png') {
                contentType = 'image/png';
            }

            res.setHeader('Content-Type', contentType);

            const fileStream = fs.createReadStream(file);
            fileStream.pipe(res);
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        next(error);
    }
});

const deleteItem = asyncWrapper( async (req, res, next) => {
    try {
            const itemId = req.params.id;
        
            const deletedItem = await Item.findByIdAndDelete(itemId);
        
            if(!deletedItem) {
                return res.status(404).json({ error: 'Item not found'});
            }
            res.status(204).send("Deleted!");
            } catch(error) {
                console.error(error);
                next(error);
            }
});


module.exports = {
    getItems,
    addItem,
    viewItem,
    downloadItem,
    deleteItem
};