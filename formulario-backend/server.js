import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));



app.post("/form", (req, res) =>{
    const {name, email, telephone, message} = req.body;
    console.log("Received data:");
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Phone: ", telephone);
    console.log("Message: ", message);

    res.status(200).send({status: "success", message: "Data received"});
    }
)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});