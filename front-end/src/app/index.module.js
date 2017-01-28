import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';

import { HeaderTitleDirective } from '../app/components/headerTitle/headerTitle.directive';
import { FriendsDirective } from '../app/components/friends/friends.directive';
import { FriendsService } from '../app/services/friends.service';
import { ValidateService } from '../app/services/validate.service';

angular.module('frontEnd', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ngRoute', 'ngMaterial', 'toastr'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .directive('friends', FriendsDirective)
  .directive('headerTitle', HeaderTitleDirective)
  .service('FriendsService', FriendsService)
  .service('ValidateService', ValidateService)
