const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Todo-List'
})

connection.connect()

connection.query('SELECT * FROM users', (err, rows, fields) => {
  if (err) throw err})

connection.end()