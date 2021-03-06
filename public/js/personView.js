angular.module('MyApp')
  .directive('person', personView);

function personView() {
  var directive = {};

  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '../views/_personView.html';
  directive.scope = {
    name: '@',
    checkamount: '=',
    tipamount: '@',
    taxamount: '@',
    delete: '&',
    updatecalculation: '&'
  };

  return directive;
}
