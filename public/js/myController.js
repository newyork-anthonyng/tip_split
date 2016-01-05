angular.module('MyApp')
  .controller('MyController', MyController);

function MyController($interval, UtilityFactory) {
  var self = this;

  // total amounts
  self.checkAmount;
  self.taxAmount;
  self.tipAmount;
  self.totalBillAmount;

  self.rec_check;
  self.rec_tax;
  self.rec_tip;
  self.rec_total;

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
    self.totalBillAmount = Number(self.checkAmount || 0) +
                           Number(self.taxAmount || 0) +
                           Number(self.tipAmount || 0);
  }

  self.calculateTip = function() {
    self.tipAmount = UtilityFactory.round(self.tipPercentage * self.checkAmount, 2);
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

    self.perPerson_check = UtilityFactory.round(myCheck / myNumberOfPeople, 2) || 0;
    self.perPerson_tax   = UtilityFactory.round(myTax / myNumberOfPeople, 2) || 0;
    self.perPerson_tip   = UtilityFactory.round(myTip / myNumberOfPeople, 2) || 0;
  };

  self.updateCalculations = function() {
    self.calculateTip();
    self.updateTotalBill();
    self.updatePerPerson();
    self.updateCustomPeople();
    self.updateReconciliation();
  };

  self.updateCustomPeople = function() {
    for(var i = 0, j = self.customPeople.length; i < j; i++) {
      var myPercent = (self.customPeople[i].checkAmount / self.checkAmount);
      self.customPeople[i].tipAmount = UtilityFactory.round(self.customPeople[i].checkAmount * self.tipPercentage, 2);
      self.customPeople[i].taxAmount = UtilityFactory.round(self.taxAmount * myPercent, 2) || 0;
    }
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
  };

  self.getTipForPerson = function(index) {
    // update person's tip amount
    return self.customPeople[index].tipAmount;
  };

  self.getTaxForPerson = function(index) {
    return self.customPeople[index].taxAmount;
  };

  self.removeCustomPerson = function(index) {
    self.customPeople.splice(index,   1);
    self.updateCalculations();
  };

  self.updateReconciliation = function() {
    self.rec_check = 0;
    self.rec_tip = 0;
    self.rec_tax = 0;

    for(var i = 0, j = self.customPeople.length; i < j; i++) {
      self.rec_check += Number(self.customPeople[i].checkAmount);
      self.rec_tip += self.customPeople[i].tipAmount;
      self.rec_tax += self.customPeople[i].taxAmount;
    }

    var restOfPeople = self.numberOfPeople - self.customPeople.length;
    self.rec_check += self.perPerson_check * restOfPeople;
    self.rec_tip += self.perPerson_tip * restOfPeople;
    self.rec_tax += self.perPerson_tax * restOfPeople;

    self.rec_total = self.rec_check + self.rec_tip + self.rec_tax;
  };

  return self;
}

angular.module('MyApp')
  .factory('UtilityFactory', UtilityFactory);

function UtilityFactory() {
  var UtilityFactory = {};

  UtilityFactory.round = function(num, decimals) {
    var rounding = Math.pow(10, decimals);

    return Math.round(num * rounding) / rounding;
  };

  return UtilityFactory;
}

angular.module('MyApp')
  .filter('percentage', ['$filter', function($filter) {
    return function(input) {
      return $filter('number')(input * 100) + '%';
    };
  }]);
