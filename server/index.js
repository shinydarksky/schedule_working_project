import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import homeRoute from './routes/homeRoute.js'
import staffRoute from './routes/staffRoute.js'
import manageRoute from './routes/manageRoute.js'
const app = express()
const PORT = 5000
const URI = 'mongodb://localhost:27017/coffeeShopC'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cookieParser())
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}))

app.listen(PORT, (err) => {
    console.log(`server running... port ${PORT}`)
})

app.get('/', (req, res) => res.status(200).json('server coffee shop C'))

import { getOneUser} from './data.js'
import loginModel from './models/loginModel.js'


app.use('/login', async (req, res) => {
    let { username, password } = req.body
    let login = await getOneUser(username, password)
    if(login){
        req.session.loginAuthor={
            id:login._id,
            isAuthor:true
        }
        res.status(200).json({results:login})
    }
    else
        res.status(500).json({'error':'login failed'})
})

app.get('/test/:name',(req,res)=>{
    let count = req.session.count +=1

    res.send({count:count})
})

app.get('/test/data',(req,res)=>{
    let count = req.session.count +=1

    res.send({count:count})
})

app.use('/home',homeRoute)

app.use('/staff', staffRoute)

app.use('/manage',manageRoute)

app.get('/login/userrefresh',async (req,res)=>{
    try {
        const userrefresh = await loginModel.findById(req.query.userid)
        res.status(200).json({results:userrefresh})
    } catch (error) {
        
    }
})