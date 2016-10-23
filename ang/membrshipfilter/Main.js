(function(angular, $, _) {

  angular.module('membrshipfilter').config(function($routeProvider) {
      $routeProvider.when('/membershipfilter', {
        controller: 'MembrshipfilterMain',
        templateUrl: '~/membrshipfilter/Main.html',

        // If you need to look up data when opening the page, list it out
        // under "resolve".
        resolve: {
          memberships: function(crmApi) {
            return crmApi('Membership', 'get', {
              //  return: ['membership_name', 'join_date', 'start_date', 'end_date', 'status_id', 'source']
            });
          }
        }
      });
    }
  );

  // The controller uses *injection*. This default injects a few things:
  //   $scope -- This is the set of variables shared between JS and HTML.
  //   crmApi, crmStatus, crmUiHelp -- These are services provided by civicrm-core.
  //   myContact -- The current contact, defined above in config().
  angular.module('membrshipfilter').controller('MembrshipfilterMain', function($scope, crmApi, crmStatus, crmUiHelp, memberships) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('myang');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/myang/HelloCtrl'}); // See: templates/CRM/myang/HelloCtrl.hlp

    // We have myContact available in JS. We also want to reference it in HTML.
    $scope.memberships = $.map(memberships.values, function(value, index) {
    return [value];
});
    $scope.membershipForm = {};
    $scope.filterMembershipsByStartDate = function(membership){
      if($scope.membershipForm.datefieldFrom && $scope.membershipForm.datefieldTo){
          return new Date(membership.start_date) >= new Date($scope.membershipForm.datefieldFrom) && new Date(membership.start_date) <= new Date($scope.membershipForm.datefieldTo);
      }
      else {
        return true;
      }

    }
    $scope.sortMemberships = function(membership){
      return new Date(membership.start_date);
    }

  });

})(angular, CRM.$, CRM._);
