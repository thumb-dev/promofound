require('dotenv').config();

const tedious = require('tedious');


module.exports = () => {
  return new Promise((resolve, reject) => {
    const db = {};
    var Connection = tedious.Connection;
      var config = {
          server: 'promofound.database.windows.net',
          authentication: {
              type: 'default',
              options: {
                  userName: process.env.DATABASE_USERNAME,
                  password: process.env.DATABASE_PASSWORD
              }
          },
          options: {
              // If you are on Microsoft Azure, you need encryption:
              encrypt: true,
              database: 'promofound',
              rowCollectionOnRequestCompletion: true
          }
      };

      db.connection = new Connection(config);

      // db.search = async (apparelStyle, apparelLabelSize, color, searchString) => {
      //   const queryString = `EXECUTE SupplierProduct_Search 1, '${apparelStyle}', ` +
      //     `'${apparelLabelSize}', '${color}', '${searchString}'`;
      //     return new Promise((resolve, reject) => {
      //       request = new Request(queryString, function(err, rowCount, rows) {
      //         console.log(err, rowCount, rows);
      //         if (err) {
      //           reject(err);
      //         }
      //         resolve(rows);
      //       });
      //       db.connection.execSql(request);
      //     })
      // };

      db.formatQueryParam = (param) => {
        let formattedParam = 'NULL';
        if (param) {
          formattedParam = `'${param}'`;
        }
        return formattedParam;
      };

      db.formatRows = (rows) => {
        jsonArray = []
        rows.forEach(function (columns) {
            var rowObject ={};
            columns.forEach(function(column) {
                rowObject[column.metadata.colName] = column.value;
            });
            jsonArray.push(rowObject)
        });
        return jsonArray;
      }

      db.connection.on('connect', function(err) {
          // If no error, then good to proceed.
          console.log("Connected");
          resolve(db);
      });

      db.connection.connect();

      })

    }

/*
    NOTE: Run on the PromoFound databas

    -- Returns all data in the table.
    -- NOTE: Use only for testing, do not write code to directly query the database.
    --              you just need to call the 2 stored procedures below
    SELECT * FROM SupplierProduct
    GO


    -- Parameters: Apparel Style, Apparel Label Size, Color, SearchString (all strings)
    -- Returns Rankiong integer, supplierName string, SupplierProductID integer, productId string, productName string, productDescription string
    -- NOTE: The Search String value does nothing. I will be working on this after I get the JSON set
    EXECUTE SupplierProduct_Search 1, NULL, NULL, NULL, 'search string here'
    GO

    EXECUTE SupplierProduct_Search 1, NULL, NULL, 'Red', ''
    GO

    EXECUTE SupplierProduct_Search 1, NULL, NULL, 'red', ''
    GO

    EXECUTE SupplierProduct_Search 1, NULL, NULL, 'blue', ''
    GO

    EXECUTE SupplierProduct_Search 1, 'unisex', NULL, NULL, ''
    GO

    EXECUTE SupplierProduct_Search 1, '', 's/m', NULL, ''
    GO

    EXECUTE SupplierProduct_Search 1, 'unisex', 's/m', NULL, ''
    GO

    -- Gets details for a Product
    -- Parameters: SupplierProductID integer
    -- Returns supplierName string, productId string, productName string,
    -- Returns sting values for: productXML, mediaXML, ppcBlankXML, ppcDecoratedXML,
    -- Returns sting values for: productJSON, mediaJSONL, ppcBlankJSONL, ppcDecoratedJSON
    -- NOTE: JSON field values are empty strings but will be populated soon
    -- NOTE: You pass in the SupplierProductID value from the SupplierProduct_Search procedure

    EXECUTE SupplierProduct_Get 1
    GO

    EXECUTE SupplierProduct_Get 2
    GO
*/
