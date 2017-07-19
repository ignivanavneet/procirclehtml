

angular.module("ignitrack").filter('capitalize', function () {
    return function (input, scope) {
        if (input != undefined) {
            if (input != null)
                input = input.toLowerCase();
            //  return input.substring(0, 1).toUpperCase() + input.substring(1);

            return input.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }
});