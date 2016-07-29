'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('reactions').factory('ReactionsService', Service);

function Service($http, $q) {
		var service = {};

    service.Create = Create;
    service.GetEducation = GetEducation;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function Create(reaction) {
			console.log(Array.isArray(reaction.data));
      return $http.post(wnm_mandrin_url.mandrin_url + 'reactions/articles/slug/'+reaction.city+'/'+reaction.slug, {"reaction": ["a","b"]}).then(handleSuccess, handleError);
    }

    function GetEducation(userId) {
      return $http.get('/api/education/'+userId).then(handleSuccess, handleError);
    }

    function Update(education) {
      return $http.put('/api/education/' + education.id, education).then(handleSuccess, handleError);
    }

    function Delete(_id) {
      return $http.delete('/api/education/' + _id).then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(res) {
      return $q.reject(res.data);
    }
	}
