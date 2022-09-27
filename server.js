const express = require('express');
var Request = require('tedious').Request;
const database = require('./database');


const app = express()
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.get('/api/search', async function(req, res) {
  // http://127.0.0.1:3000/search?style=unisex&size=m&color=red&search=hello

  const db = await database();
  const supplier = db.formatQueryParam(req.query.supplier);
  const style = db.formatQueryParam(req.query.style);
  const size = db.formatQueryParam(req.query.size);
  const color = db.formatQueryParam(req.query.color);
  const search = db.formatQueryParam(req.query.search);
  console.log('Searching', supplier, style, size, color, search);

  // "EXECUTE SupplierProduct_Search 1, 'unisex', 's/m', NULL, ''"
  // This is probably allowing sql injection
  const queryString = `EXECUTE SupplierProduct_Search ${supplier}, ${style}, ` +
      `${size}, ${color}, ${search}`;
  console.log('queryString', queryString);

  request = new Request(queryString, function(err, rowCount, rows) {
    let productData = [];
    if (!err) {
      productData = db.formatRows(rows);
    }
    return res.json(productData);

  });
  db.connection.execSql(request);
});

app.get('/api/products/:productId', async function(req, res) {
  // http://127.0.0.1:3000/search?style=unisex&size=m&color=red&search=hello

  const db = await database();

  // This is probably allowing sql injection
  const queryString = `EXECUTE SupplierProduct_Get ${req.params.productId}`;
  console.log('queryString', queryString);

  request = new Request(queryString, function(err, rowCount, rows) {
    console.log(err, rowCount, rows);
    let productData = {};
    if (!err) {
      if (rows) {
        const formatedRows = db.formatRows(rows);
        productData = formatedRows[0];
      }
    }

    return res.json(productData);

  });
  db.connection.execSql(request);
});


app.get('*', async function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
