angular.module('MyApp')
  .controller('MyController', MyController);

function MyController() {
  var self = this;

  // total amounts
  self.checkAmount;
  self.taxAmount;
  self.tipAmount;
  self.totalBillAmount;

  // people
  self.numberOfPeople = 1;
  self.customPeople = [];

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
    self.totalBillAmount = Number(self.checkAmount || 0) + Number(self.taxAmount || 0) + Number(self.tipAmount || 0);
  }

  self.calculateTip = function() {
    self.tipAmount = Math.round(self.tipPercentage * self.checkAmount * 100) / 100;
  };

  self.updatePerPerson = function() {
    var myNumberOfPeople = self.numberOfPeople;

    if(!self.numberOfPeople) myNumberOfPeople = 1;

    self.perPerson_check = Math.round(self.checkAmount / myNumberOfPeople * 100) / 100 || 0;
    self.perPerson_tax   = Math.round(self.taxAmount / myNumberOfPeople * 100) / 100 || 0;
    self.perPerson_tip   = Math.round(self.tipAmount / myNumberOfPeople * 100) / 100 || 0;
  };

  self.updateCalculations = function() {
    self.calculateTip();
    self.updateTotalBill();
    self.updatePerPerson();
  };

  self.addCustomPerson = function() {
    // check number of total people
    if(self.customPeople.length >= self.numberOfPeople) return;

    var newPerson = {
      checkAmount: 0,
      tipAmount:   0,
      taxAmount:   0
    };

    self.customPeople.push(newPerson);
    console.log(self.customPeople);
  };

  self.test = function(index) {
    console.log('Hello world ' + index);
    console.log(self.customPeople);
  }

  return self;
}
