myApp.controller('SalaryTrackerController', ['$http', function($http) {
  console.log('salary tracker controller running');

  var self = this;
  self.newEmployee = {};  // object connected to HTML form on view
  self.employees = [];
  self.monthlyTotal = 0;


  getEmployees();

  // get all employee data
  function getEmployees() {
    $http.get('/employees').then(function(response) {
      self.employees = response.data;
      getSalaries();
    });
  }

  function getSalaries() {
    $http.get('/employees/salaries').then(function(response) {
      console.log('total from server: ', response.data);
      self.monthlyTotal = Math.round(response.data[0].salary_total / 12);
    });
  }

  // add employee from form
  self.addEmployee = function() {
    console.log(self.newEmployee);
    // send to server
    $http.post('/employees', self.newEmployee).then(function(response) {
      self.newEmployee = {};
      getEmployees();
    });
  };

  self.toggleActive = function(employeeID) {
    $http.put('/employees/' + employeeID).then(function(response) {
      getEmployees();
    });
  }


}]); // end controller code block
