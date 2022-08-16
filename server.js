import express from 'express';
import session from 'express-session';
import mongoose from "mongoose";
import cvRouter from "./routes/cvRoute.js"
import 'dotenv/config'
import cors from 'cors'
import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";

const db = process.env.BDD_URL
const app = express()
const router = express.Router()

app.use(session({secret: process.env.SECRET_KEY,saveUninitialized: true, resave: true}))
app.use(cors())
app.use(express.static('./assets'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
router.use(cvRouter)

router.get('/*', function(req, res) {
    res.redirect('/');
   });

router.post('/', async (req, res) => {
    console.log(req.body);

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'fonsat.nodemailer@gmail.com',
            pass: 'dlclhbrybfcawlgi'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'fonsat.pro@gmail.com',
        subject: req.body.subject,
        html: `<p>${req.body.name} <br> ${req.body.message}</p>`
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
            res.send('error')
        }else{
            console.log('Email sent: '+info.res);
            res.redirect('/')
        }
    })

   });  

app.listen(process.env.PORT, function(err){
    if (err) {
        console.log(err);
    }else{
        console.log(`connected to ${process.env.APP_URL}`);
    }
})
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connected to database mongodb (c'est dur....)");
    }
})

export default router