require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();



app.set('views', path.join(__dirname, 'auth-src', 'views'));
app.use(express.static(path.join(__dirname, 'auth-src', 'public')))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/auth/login', async (req, res) => {
    const {pinCode} = login
})




const options = {
    key: fs.readFileSync('./certificates/certificates/key.pem', 'utf-8'),
    cert: fs.readFileSync('./certificates/certificates/server.crt', 'utf-8')
}


app.use(logger)
// app.use('/auth', authRoute);
// app.use('/', indexRoute)
// app.use('/users', userRoute)
app.post('/transaction/create')

const port = process.env.AUTH || 3113;
const server = https.createServer(options, app);

server.listen(port, (req, res) => `Server running at port ${port}`)