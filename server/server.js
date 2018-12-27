const express = require('express');
const path = require('path');
const routes = require('./routes')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 8000;
const router = express.Router();


app.set('view engine', 'html');
app.use([bodyParser.json(), bodyParser.urlencoded({ extended: true })]);
app.use(express.static(path.join(__dirname, '../client')));
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Server Error');
});
app.use('/api', routes);

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(port, (err) => {
    err
        ? console.log('Tidak Bisa Tersambung Ke Server', err)
        : console.log(`Tersambung ke port ${port}`)
})