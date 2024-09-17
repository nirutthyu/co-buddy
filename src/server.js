const express = require('express');
const collection = require("./mongo")
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require('@google/generative-ai');
dotenv.config();

const PORT = 3001;
global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;
const app = express();
app.use(cors());
app.use(express.json());
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post('/gemini', async (req, res) => {
    console.log(req.body.history);
    console.log(req.body.message);
    try {
        const model = genAi.getGenerativeModel({ model: 'gemini-pro' });
        const chat = model.startChat({
            history: req.body.history,
        });
        const msg = req.body.message;
        const result = await chat.sendMessage(msg);
        const response = result.response;
        const text = await response.text();
        console.log(text);
        res.send(text);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/gemini/quiz', async (req, res) => {
    const topic = req.body.topic;
    try {
        const model = genAi.getGenerativeModel({ model: 'gemini-pro' });
        const content = await model.generateContent(
            `Generate a quiz with 5 questions on the topic ${topic}. Format each question followed by its answer, using "::" to separate the question and answer. Example: "Question  :: Answer ". No additional formatting.`
        );
        const response = content.response;
        const text = await response.text();

        // Split by new lines first to separate each question-answer pair
        const parts = text.split('\n').filter(line => line.trim() !== '');

        let questions = [];
        let answers = [];
        parts.forEach(line => {
            // Split each line by "::" to separate the question and answer
            const [question, answer] = line.split("::");
            if (question && answer) {
                questions.push(question.trim());
                answers.push(answer.trim());
            }
        });
        console.log(questions);
        console.log(answers);

        // Sending questions and answers back as a response
        const responseData = { questions, answers };
        res.json(responseData);
    } catch (error) {
        console.log("An error occurred:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/",async(req,res)=>{
    const{email}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
            
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{name,email,password}=req.body

    const data={
        email:email,
        password:password,
        name:name
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
            
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.post("/save-score", async (req, res) => {
    const { email, score } = req.body;

    try {
        const user = await collection.findOne({ email });

        if (user) {

            let updateFields = { $set: { score: score } }; 

            if (score === 5) {
                updateFields.$inc = { gold: 1 }; 
            } else if (score >= 3 && score <= 4) {
                updateFields.$inc = { silver: 1 }; 
            } else if (score === 2) {
                updateFields.$inc = { bronze: 1 };
            }

            await collection.updateOne(
                { email },
                updateFields
            );

            res.json({ status: "success", message: "Score and medals updated successfully" });
        } else {
            res.status(404).json({ status: "fail", message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

app.post("/get-medal-counts", async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await collection.findOne({ email });
  
      if (user) {
        res.json({
          gold: user.gold || 0,
          silver: user.silver || 0,
          bronze: user.bronze || 0
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
