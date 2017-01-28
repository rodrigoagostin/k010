export function HeaderTitleDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/headerTitle/headerTitle.html',
    scope: {
        text: '@'
    },
    controller: HeaderTitleController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class HeaderTitleController {
  constructor () {
    'ngInject';
  }
}
