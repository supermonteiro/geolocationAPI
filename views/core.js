var geolocation = angular.module('geolocation', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/places')
        .success(function(data) {
            $scope.locations = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createPlace = function() {
        $http.post('/api/places/:location', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.locations = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };   

}