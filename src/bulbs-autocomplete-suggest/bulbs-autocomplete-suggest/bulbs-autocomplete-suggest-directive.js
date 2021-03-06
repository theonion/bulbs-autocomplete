'use strict';

angular.module('BulbsAutocomplete.suggest.directive', [])
  .directive('bulbsAutocompleteSuggest', ['BULBS_AUTOCOMPLETE_EVENT_KEYPRESS', function (BULBS_AUTOCOMPLETE_EVENT_KEYPRESS) {
    return {
      restrict: 'E',
      templateUrl: 'src/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest/bulbs-autocomplete-suggest.html',
      scope: {
        formatter: '&',
        items: '=',
        onSelect: '&'
      },
      link: function (scope) {
        scope.mouseActive = false;
        scope.selectedIndex = -1;

        scope.mouseEnterItem = function (index) {
          scope.mouseActive = true;
          scope.selectedIndex = index;
        };

        scope.mouseLeaveItem = function () {
          scope.mouseActive = false;
          scope.selectedIndex = -1;
        };

        scope.$on(BULBS_AUTOCOMPLETE_EVENT_KEYPRESS, function (event, keyEvent) {
          if (scope.items) {
            var lastIndexOfItems = scope.items.length - 1;
            switch (keyEvent.keyCode) {
              case 13:
                // enter
                scope.onSelect({
                  selection: scope.selectedIndex === -1 ? null : scope.items[scope.selectedIndex]
                });
                break;
              case 38:
                // up
                if (!scope.mouseActive) {
                  scope.selectedIndex = scope.selectedIndex <= -1 ? lastIndexOfItems : scope.selectedIndex - 1;
                }
                break;
              case 40:
                //Down
                if (!scope.mouseActive) {
                  scope.selectedIndex = scope.selectedIndex >= lastIndexOfItems ? -1 : scope.selectedIndex + 1;
                }
                break;
            }
          }
        });
      }
    };
  }]);
