const http = require('http');
const express = require('express');
const BadRequestError = require('./errors/BadRequestError');
const app = express();
const { StatusCodes } = require('http-status-codes');
require('express-async-errors');
const notFound= require('./middleware/NotFound')
const errorHandler = require('./middleware/errorHandler');
const { join } = require('path');
const data = require('./data.json');
const { writeFileSync } = require('fs');

app.use(express.static('public'));
app.use(express.json());

const server = http.createServer(app);

app.post('/addphone', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const phone = req.body.phone;
    const city = req.body.city;
    console.log(req.body);
    if(!name){
      throw new BadRequestError("name is required");
    }
    if(!surname){
      throw new BadRequestError("surname is required");
    }
    if(!phone){
      throw new BadRequestError("phone is required");
    }
    if(!city){
      throw new BadRequestError("city is required");
    }

    data.push({
      name:name,
      surname:surname,
      phone: phone, 
      city: city
    })
    writeFileSync('data.json', JSON.stringify(data));
    res.status(200).json({
      ok: true,
      message: 'Successfully created contact'
    });
})

app.get('/getphone', function(req, res){
    res.status(StatusCodes.OK).json({
      ok:true,
      data:data
    })
})

app.use(notFound);
app.use(errorHandler);

const PORT  = process.env.PORT || 5000;

server.listen(PORT,() =>{
  console.log(`app listens on port ${PORT}`)
})