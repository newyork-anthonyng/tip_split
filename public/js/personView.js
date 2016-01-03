angular.module('MyApp')
  .directive('person', personView);

function personView() {
  var directive = {};

  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '_personView.html';
  directive.scope = {
    name: '@',
    checkamount: '=',
    tipamount: '@',
    taxamount: '@',
    test: '&',
    updatecalculation: '&'
  };

  return directive;
}
