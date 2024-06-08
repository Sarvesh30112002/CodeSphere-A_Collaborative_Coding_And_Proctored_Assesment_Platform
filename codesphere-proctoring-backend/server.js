const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const uniqueId = require("uniqid");
require("dotenv").config();
// require("./db/config.js").connect();
const connectDB = require("./db/config.js")
const UserDataSchema = require("./models/userdata.js");
const port = process.env.PORT || 3000;
const cloudinary = require('cloudinary');


var interval = 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.static("./public"));

/*  route to set new value to interval  */
app.get("/set_interval", (req, res) => {
    interval = req.query.interval * 60 * 1000;
    console.log("interval setted to " + interval + " miliseconds");
    res.send({ success: true }).status(200).end();
});

/*  route for createting new User */
app.post("/createUser", async (req, res) => {
    try {
        const id = uniqueId.time();

        const { firstName, lastName, email, testInvitation } = req.body;
        console.log(req.body);

        const UserDataSchemaObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            testInvitation: testInvitation,
            id: id,
            images: [],
        };

        const data = new UserDataSchema(UserDataSchemaObj);
        await data.save(); // async

        res.send({ userid: id }).status(200).end();
    } catch {
        // if error is occured
        res.send({ error: "Something went wrong" }).status(500).end();
    }
});


        // Update user document with the new image URL
        const user = await UserDataSchema.findOneAndUpdate(
            { id: userid },
            { $push: { images: { id: fileName, url: result.secure_url } } },
            { new: true }
        );

        // Return success response
        res.json({ interval }).status(200);
    } catch (error) {
        console.log("Error uploading image:", error);
        res.status(500).send("Failed to save image");
    }
});


/*  route to get all users data */
app.get("/retrieve-data", async (_req, res) => {
    const data = await UserDataSchema.find({});

    res.json({ data: data }).status(200).end();
});

app.get("/cleardb", async (_req, res) => {
    const data = await UserDataSchema.deleteMany();
    res.json({ message: data }).status(200).end();
});


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`API is setup on✅... http://localhost:${port}/`)
        );
        console.log("connected to db🔥...");
    } catch (err) {
        console.log("error with db❌ =>", err);
    }
};

start();
