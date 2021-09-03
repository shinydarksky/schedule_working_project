app.post('/test', (req, res) => {
    res.status(200).json({ result: '123' })
})

app.post('/schedule', (req, res) => {
    res.status(200).json({ results: schedule })
})



app.get('/staff', (req, res) => {
    res.status(200).json({ results: staff })
})



app.post('/login', async (req, res) => {
    let { username, password } = req.body
    let login = await loginModel.findOne({ username: username, password })
    res.status(200).json({ login: login })
})


app.get('/week', async (req, res) => {
    let week = await weekModel.find().sort({ weekname: 'asc' })
    let staffschedule = await getStaffSchedule(week[0]._id, '6122460f2df7821244ca413f')
    res.status(200).json({ week_list: week,staffschedule:staffschedule})
})


app.post('/week', async (req, res) => {
    let week = await weekModel.find().sort({})
    res.status(200).json({ results: week })
})
