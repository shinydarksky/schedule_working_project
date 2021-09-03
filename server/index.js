import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import homeRoute from './routes/homeRoute.js'
import staffRoute from './routes/staffRoute.js'
import manageRoute from './routes/manageRoute.js'
const app = express()
const PORT = 5000

const URI = 'mongodb://localhost:27017/coffeeShopC'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))

app.listen(PORT, (err) => {
    console.log(`server running... port ${PORT}`)
})

app.get('/', (req, res) => res.status(200).json('server coffee shop C'))

import { getOneUser} from './data.js'
import loginModel from './models/loginModel.js'

app.post('/login', async (req, res) => {
    let { username, password } = req.body
    let login = await getOneUser(username, password)
    res.status(200).json({ login: login })
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