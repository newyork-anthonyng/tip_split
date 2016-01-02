var myApp = angular.module('MyApp', []);

/** Controller **/
myApp.controller('MyController', MyController);

function MyController() {
  var self = this;
  self.checkAmount;
  self.taxAmount;
  self.tipAmount;
  self.numberOfPeople = 1;

  // tip percentages
  self.tipPercentage_low = .15;
  self.tipPercentage_med = .17;
  self.tipPercentage_hi  = .20;
  self.tipPercentage     = self.tipPercentage_med;

  // per person amount
  self.perPerson_check;
  self.perPerson_tax;
  self.perPerson_tip;

  self.calculateTip = function() {
    // console.log('calculating tip');
    // console.log(self.tipPercentage);
    // console.log(self.checkAmount);
    self.tipAmount = self.tipPercentage * self.checkAmount;
  };

  self.updatePerPerson = function() {

  };

  self.updateCalculations = function() {
    self.calculateTip();
    self.updatePerPerson();
  };


}
