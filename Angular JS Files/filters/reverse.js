angular.module('adeayo')
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
