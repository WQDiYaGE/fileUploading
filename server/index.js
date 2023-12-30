const express = require("express");
const connection = require("./src/config/connection");

const app = express();

const dotenv = require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Hello world!");
// });

const itemsRouter = require("./src/routes/items");

app.use("/api/v1/items", itemsRouter);


const start = async () => {
    try {
        await connection(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
        
    } catch(error) {
        console.log(error);
    }
};



start();

