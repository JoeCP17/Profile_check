const express = require('express')
const app = express()
const port = 3200
const sqlrouter =  require('./routes/dbconnect.js');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})




app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })

