import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
// Routes
import RouteTranslation from "./routes/translation.js"
import RoutePhoto from "./routes/photo.js"
// Realtime function
import Pusher from "pusher"


dotenv.config()

const pusher = new Pusher({
    appId: process.env.APP_PUSHER_APPID,
    key: process.env.APP_PUSHER_KEY,
    secret: process.env.APP_PUSHER_SECRET,
    cluster: process.env.APP_PUSHER_CLUSTER,
    useTLS: true
});

const channel = "photos";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/translation", RouteTranslation);
app.use("/photos", RoutePhoto);

app.get("/", (req, res) => {
    res.send("Welcome to Imago")
});

const CONNECTION_TO_MONGODB = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_TO_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection error"));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log("Connected. Server on port ", PORT);
    });
    /** Real time */

    const photoCollection = db.collection("photomodels");
    const changeStream = photoCollection.watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const photo = change.fullDocument;
            pusher.trigger(
                channel,
                'inserted',
                {
                    _id: photo._id,
                    title: photo.title,
                    precision: photo.precision,
                    selectedFile: photo.selectedFile
                }
            );
        } else if (change.operationType === 'delete') {
            pusher.trigger(
                channel,
                'deleted',
                change.documentKey._id
            );
        }
    });
});

