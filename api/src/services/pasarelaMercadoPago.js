const mercadopago = require('mercadopago');
require('dotenv').config();

const {ACCESS_TOKEN} = process.env

 mercadopago.configure({
   access_token :"TEST-8245775729794671-101116-5093ba477dfdff5d6e8a070de0429104-469152125"
});

module.exports = mercadopago