// TransformableGrid module. This module connects with Instagram API endpoint
var app = angular.module("transformableGrid", ['ngResource']);

// Create and register the new "Instagram" service
app.factory('instagram', function($resource){
	return {
		grabPopular: function(callback){
			// grab the most popular photos
			var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',
			{
				client_id: '5a9577e1985f49caa7f9c4003b7c5d05'
			},{
				grab:{method:'JSONP'}
			});

			api.grab(function(response){
				callback(response.data);
			});
		}
	}
});

// The controller
function TransformableGridController($scope, instagram){
	$scope.layout = 'grid'; // Default layout of the app. 
	$scope.pics = [];

	// Use the instagram service, fetch a list of popular pictures and refresh the view
	instagram.grabPopular(function(data){
		$scope.pics = data;
	});
}