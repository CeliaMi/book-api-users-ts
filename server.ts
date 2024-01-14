import express from 'express';
import {PORT} from "./utils/config";
import db from "./database/db"
import userRouter from './routes/UserRouter';
import cors from 'cors'


const app = express();
// app.get('/', (_req, res) =>{
//     res.redirect('/api/');
//     })
    
app.use(cors())
app.use(express.json())
app.use('/api/',userRouter)


try{
	db.authenticate()
	console.log('💫💫💫conected to database💫💫💫')
	}catch(error){
	console.log(`error:' ${error}`)
	}


    export const server = app.listen(PORT,() =>{
	console.log(`🚀server up in http://localhost:${PORT}/`)
} )