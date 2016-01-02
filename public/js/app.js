var myApp = angular.module('MyApp', []);

/** Controller **/
myApp.controller('MyController', MyController);

function MyController() {
  var self = this;

  // total amounts
  self.checkAmount;
  self.taxAmount;
  self.tipAmount;
  self.totalBillAmount;

  // people
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

  self.updateTotalBill = function() {
    self.totalBillAmount = self.checkAmount + self.taxAmount + self.tipAmount;
  }

  self.calculateTip = function() {
    // console.log('calculating tip');
    // console.log(self.tipPercentage);
    // console.log(self.checkAmount);
    self.tipAmount = self.tipPercentage * self.checkAmount;
  };

  self.updatePerPerson = function() {
    self.perPerson_check = self.checkAmount / self.numberOfPeople;
    self.perPerson_tax   = self.taxAmount / self.numberOfPeople;
    self.perPerson_tip   = self.tipAmount / self.numberOfPeople;
  };

  self.updateCalculations = function() {
    self.calculateTip();
    self.updateTotalBill();
    self.updatePerPerson();
  };


}
