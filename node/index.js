const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTablePeople = `create table if not exists people(id int not null auto_increment, name varchar(255), primary key (id))`
const sqlQuery = `SELECT id, name FROM people`
const sqlInsert = `INSERT INTO people(name) values (concat('Pessoa ', now()))`

connection.query(createTablePeople)
connection.query(sqlInsert)

app.get('/', (req,res) => {
    let data = '<h1>Full Cycle</h1>'
               + '<br/><br/>'
               + 'Lista de nomes cadastrada no banco de dados:'
               + '<br/><br/>';
    (async () => {
        const result = await getData();
        data += result;
        console.log(data);
        res.send( data )
      })();
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function getData() {
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, (err, result) => {
          if (err) {
              return reject(err);
          }
          let data = '';
          for (let i=0; i<result.length; i++) {
              data += '<span>ID: </span>'+result[i].id
                   +  '&nbsp;'
                   +  '<span>Nome: </span>'+result[i].name
                   +  '<br/>';
          }
          return resolve(data);
        }
      );
    });
}