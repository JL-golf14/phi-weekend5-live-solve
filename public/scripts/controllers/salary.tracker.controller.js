myApp.controller('SalaryTrackerController', ['$http', function($http) {
  console.log('salary tracker controller running');

  var self = this;
  self.newEmployee = {};  // object connected to HTML form on view
  self.employees = [];


  getEmployees();

  // get all employee data
  function getEmployees() {
    $http.get('/employees').then(function(response) {
      self.employees = response.data;
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


}]); // end controller code block
