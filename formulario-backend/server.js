import express from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));


const transporter = nodemailer.createTransport({
    service: 'gmail', // o el servicio que uses
    auth: {
        user: 'kdekuico@gmail.com', // Tu correo
        pass: 'qlxd gkst mntw gvsf' // Tu contraseña de aplicación
    }
});



app.post("/form", async (req, res) => {
    const {name, email, telephone, message} = req.body;
    console.log("Received data:");
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Phone: ", telephone);
    console.log("Message: ", message);

    const mailOptions = {
        from: 'kdekuico@gmail.com', // Tu correo (remitente)
        to: 'kdekuico@gmail.com', // Tu correo (recibes tú el mensaje)
        subject: `Nuevo mensaje de ${name}`,
        html: `
            <h2>Nuevo mensaje del formulario</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telephone}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
            `
    };

    try {
        // Enviar el correo
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado exitosamente");

        res.status(200).send({status: "success", message: "Datos recibidos y correo enviado"});
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).send({status: "error", message: "Error al enviar correo"});
    }


})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});