const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 3000;
const nlpStart = require('./nlpStart');
const winston = require("winston");
let nlp;

app.use(express.json());
app.use(cors({
    origin: true,//For now
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true
}));

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});





app.get('/', function(req, res) {
    res.send("Hello World");
})

app.post('/conversation', async function (req, res) {
    console.log(req.body.transcript)
    const userTranscript = req.body.transcript;
    logger.log("info", "User Transcript: "+userTranscript);
    const response = await nlp.process('en', userTranscript);
    // console.log("The response is: ",response);
    logger.log("info", response);
    res.send({response: response.answer});
})



async function startServer(){
    nlp = await nlpStart()
    app.listen(PORT, function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    }); 
    // console.log("Server listening on port " + PORT + "!")
  }
startServer();
  