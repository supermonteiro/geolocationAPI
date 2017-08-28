var geolocation = angular.module('geolocation', ['ngFileUpload']);        
navigator.geolocation.watchPosition(render);
var lat, lon = 0;
function render(pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    console.log(lat +","+ lon);
}

function withQuery(url, parameters) {
    const query = Object.keys(parameters)
    .map(function (key) {
      return key + '=' + parameters[key];
    })
.join('&');
return query.length
    ? url + '?' + query
    : url;
};       

function mainController($scope, Upload, $http) {
    $scope.formData = {};
    $scope.values=[];
    $scope.sortType     = 'locationName'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term
    $scope.lat = lat;
    $scope.lon = lon;    
    
    $http.get('/api/places')
        .success(function(data) {
            $scope.locations = data;            
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
    $scope.uploadFiles = function (files) {
        $scope.files = files;
        if (files && files.length) {
            Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                    files: files
                }
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };    

    $scope.searchLocations = function () {        
        const url = withQuery('api/places', {
            minDistance: $scope.minDistance,
            maxDistance: $scope.maxDistance
        });
    /*
    if (minDistance == null)
        minDistance = 0;
    if (maxDistance == null)
        maxDistance = 9999999999999999;
    */
        $http.get(url)
            .success(function (response) {
                $scope.searchLocations = response.data;            
            })
            .error(function (reason) {
                console.log('Error: ' + reason);
            });
    };
    
    $scope.createLocation = function() {                
        $scope.formData.geolocation = { coordinates: $scope.values }
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

    $scope.updateLocation = function() {                
        $scope.formData.geolocation = { coordinates: $scope.values }
        $http.put('/api/places/'+$scope.formData.locationName, $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another                       
                $scope.locations = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.createFavorite = function() {
        $http.post('/api/favorite', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.favorites = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.deleteFavorite = function() {
        $http.delete('/api/favorite/'+$scope.formData.favoriteID, $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.favorites = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };   
}