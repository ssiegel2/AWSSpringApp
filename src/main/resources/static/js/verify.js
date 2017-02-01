var verify = function(userData) {
    var poolData = {
        UserPoolId: AWS_USER_POOL_ID,
        ClientId: AWS_CLIENT_ID
    };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var userAuth = {
        Username : userData['username'],
        Pool: userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userAuth);

    console.log(userData);

    cognitoUser.confirmRegistration(userData['Code'], true, function(err, result) {
        if(err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}


$(document).ready(function() {
    $('#verifySubmit').on('click', function(event){
        event.preventDefault();
        verify($('#verify').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {}));
    });
});
