angular.module('MyApp')
  .controller('MyController', MyController);

function MyController($interval) {
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

    var customPeople_checkAmount = 0;
    var customPeople_taxAmount = 0;
    var customPeople_tipAmount = 0;
    for(var i = 0, j = self.customPeople.length; i < j; i++) {
      customPeople_checkAmount += Number(self.customPeople[i].checkAmount);
      customPeople_taxAmount += self.customPeople[i].taxAmount;
      customPeople_tipAmount += self.customPeople[i].tipAmount;
    }

    myNumberOfPeople -= self.customPeople.length;

    // carve out the custom people amount
    var myCheck = self.checkAmount - customPeople_checkAmount;
    var myTax = self.taxAmount - customPeople_taxAmount;
    var myTip = self.tipAmount - customPeople_tipAmount;

    console.log('myCheck: ' + myCheck);
    console.log('myNumberOfPeople: ' + myNumberOfPeople);

    self.perPerson_check = Math.round(myCheck / myNumberOfPeople * 100) / 100 || 0;
    self.perPerson_tax   = Math.round(myTax / myNumberOfPeople * 100) / 100 || 0;
    self.perPerson_tip   = Math.round(myTip / myNumberOfPeople * 100) / 100 || 0;
  };

  self.updateCalculations = function() {
    self.calculateTip();
    self.updateTotalBill();
    self.updatePerPerson();
    self.updateCustomPeople();

    self.test();
  };

  self.updateCustomPeople = function() {
    for(var i = 0, j = self.customPeople.length; i < j; i++) {
      var myPercent = (self.customPeople[i].checkAmount / self.checkAmount);
      self.customPeople[i].tipAmount = Math.round(self.customPeople[i].checkAmount * self.tipPercentage * 100) / 100;
      self.customPeople[i].taxAmount = Math.round(self.taxAmount * myPercent * 100) / 100 || 0;
    }
  };
  self.addCustomPerson = function() {
    // check number of total people
    if(self.customPeople.length >= self.numberOfPeople) return;

    var newPerson = {
      checkAmount: 0,
      tipAmount:   -1,
      taxAmount:   -1
    };

    self.customPeople.push(newPerson);
  };

  self.test = function(index) {
    console.log(self.customPeople);
  };

  self.getTipForPerson = function(index) {
    // update person's tip amount
    return self.customPeople[index].tipAmount;
  };

  self.getTaxForPerson = function(index) {
    return self.customPeople[index].taxAmount;
  };

  return self;
}
