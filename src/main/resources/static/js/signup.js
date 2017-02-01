var userSignUp = function(userData) {

    var cognitoUser;

    var poolData = {
        UserPoolId: AWS_USER_POOL_ID,
        ClientId: AWS_CLIENT_ID
    };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: userData['email']
    };

    var attributeName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeName);

    userPool.signUp(userData['username'], userData['password'], attributeList, null, function(err, result) {
        if(err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;

    });

    return cognitoUser;
}

var verify = function(user, code) {
    user.confirmRegistration(code, true, function(err, result) {
        if(err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}

$(document).ready(function() {

    $('#signUpSubmit').on('click', function(event){
        event.preventDefault();
        userSignUp($('#signUp').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {}));
    });

});
