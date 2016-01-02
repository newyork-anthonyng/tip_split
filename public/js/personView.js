angular.module('MyApp')
  .directive('person', personView);

function personView() {
  var directive = {};

  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '_personView.html';
  directive.scope = {
    name: '@',
    checkAmount: '@',
    tipAmount: '@',
    taxAmount: '@'
  };

  return directive;
}
