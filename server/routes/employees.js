var router = require('express').Router();
var pg = require('pg');
var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 1500
};
var pool = new pg.Pool(config);

  // sample GET request

router.get('/', function(req, res) {
console.log('hit my get all tasks route');
pool.connect(function(err, client, done) {
  if(err){
    console.log(err);
    res.sendStatus(500);
  }else{
    // SELECT * FROM task;
    client.query('SELECT * FROM employees', function(err, result) {
      done(); // close the connection db

      if(err){
        console.log(err);
        res.sendStatus(500); // the world exploded
      }else{
        console.log(result.rows);
        res.status(200).send(result.rows);
      }
    });
  }
});
});

router.post('/', function(req, res) {
  var newEmployee = req.body;
  console.log(newEmployee);
  // save new employee to DB
  pool.connect(function(err, client, done) {
    if(err) {
      console.log('connection err: ', err);
      res.sendStatus(500);
    } else {
      // SELECT * FROM task;
      client.query('INSERT INTO employees (first_name, last_name, title, employee_id, annual_salary)' +
                  'VALUES ($1, $2, $3, $4, $5);',
                  [newEmployee.first_name, newEmployee.last_name, newEmployee.title, newEmployee.employee_id, newEmployee.annual_salary],
                  function(err, result) {
        done(); // close the connection db

        if(err){
          console.log('query err: ', err);
          res.sendStatus(500); // there was a minor problem, but things are probably going to be OK
        }else{
          console.log(result.rows);
          res.sendStatus(201);
        }
      });
    }
  });

});

module.exports = router;
