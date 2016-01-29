(function() {
    angular.module("signup", [])

        .controller("signupController",function ($scope, $http) {

                $scope.userObject = {};

                $scope.signup = function(){

                    $http({
                        method : "post",
                        url : "/v1/signup",
                        data : {
                            email : $scope.userObject.email,
                            password : $scope.userObject.password,

                            fname : $scope.userObject.firstName,
                            lname : $scope.userObject.lastName,
                            username : $scope.userObject.username,
                            companyName : $scope.userObject.companyName

                        }
                    });





                }
            }
        );








})();