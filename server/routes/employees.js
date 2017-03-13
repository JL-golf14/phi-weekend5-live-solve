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

router.get('/', function(req, res) {
  console.log('hit my get all tasks route');
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      // SELECT * FROM task;
      client.query('SELECT * FROM employees ORDER BY id ASC', function(err, result) {
        done(); // close the connection db

        if(err){
          console.log(err);
          res.sendStatus(500); // the world exploded
        }else{
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});


// get salaries
router.get('/salaries', function(req, res) {
  console.log('getting all salaries');
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      // SELECT * FROM task;
      client.query('SELECT SUM(annual_salary) AS salary_total FROM employees WHERE active = TRUE', function(err, result) {
        done(); // close the connection db

        if(err){
          console.log(err);
          res.sendStatus(500); // the world exploded
        }else{
          console.log(result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.put('/:id', function(req, res) {
  console.log('put route');
  var employee_id = req.params.id;

  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      // SELECT * FROM task;
      client.query('UPDATE employees SET active = NOT active WHERE id = $1', [employee_id], function(err, result) {
        done(); // close the connection db

        if(err){
          console.log(err);
          res.sendStatus(500); // things are maybe kinda bad
        }else{
          console.log(result.rows);
          res.sendStatus(204);
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
