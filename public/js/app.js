var myApp = angular.module('MyApp', []);

/** Controller **/
myApp.controller('MyController', MyController);
function MyController() {
  var self = this;
  self.testMessage = 'Hello World';
}
