import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import UserModel from './model/User.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
const uploadMiddleware= multer({dest:'uploads/'})
import fs from 'fs'
import PostModel from './model/Post.js'

const saltRounds = parseInt(process.env.SALT_ROUNDS)
const secretKey = process.env.SECRET_KEY
const mongodbuser = process.env.MONGO_DB_USER
const mongodbpass = process.env.MONGO_DB_PASSWORD
const uri = `mongodb+srv://${mongodbuser}:${mongodbpass}@cluster0.q4kkbqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port= 4000;
const salt = bcrypt.genSaltSync(saltRounds);

await mongoose.connect(uri)


const app = express();
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

app.get('/test',(req,res)=>{
    res.json('test ok');
})

app.post('/register', async (req,res)=>{
    const {username,password} = req.body;
    const hash = bcrypt.hashSync(password,salt)
    try {
        const userDoc = await UserModel.create({
            username,
            password: hash
        })
        res.json(userDoc)
    }catch(e){
        res.status(400).json(e);
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const userDoc = await UserModel.findOne({username});
    const passOk = bcrypt.compareSync(password,userDoc.password);
    // console.log(passOk);
    // res.json(passOk);
    if(passOk){
        // logged in
        jwt.sign({username,id:userDoc._id},secretKey,{expiresIn:120000},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token,{maxAge:120000, httpOnly:true}).json({
                id:userDoc._id,
                username
            });
        })
    }else{
        res.status(400).json('wrong credentials')
    }
})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({error:'Unauthorized Access'})
    }

    jwt.verify(token,secretKey,{maxAge:120000, httpOnly:true},(err,info)=>{
        if(err) throw err;
        res.json(info)
    })
});

app.post('/logout',(req,res)=>{
    res.cookie('token', '').json('ok')    
})

app.post('/create', uploadMiddleware.single('file') ,async (req,res)=>{
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1]
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath)

    const {token} = req.cookies;
    jwt.verify(token, secretKey, {}, async(err,info)=>{
        const {title,summary,content} = req.body;
        if (err) throw err;
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id
        })
        res.json(postDoc);
    })


})

app.get("/post",async(req,res)=>{
    const posts = await PostModel.find().populate('author',['username']).sort({createdAt:-1}).limit(20);
    res.json(posts)
})

app.listen(port,()=>{
    console.log('listening on port', port);
})
