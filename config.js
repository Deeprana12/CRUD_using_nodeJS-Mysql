const mysql = require('mysql')


//connection
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
});

connection.connect((err)=>{
    if(err) console.log('error');
    console.log("Connected successfully to MySql server")
});

//exporting connection to use in another components
module.exports = connection