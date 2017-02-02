var userSignIn = function(userData) {

    console.log(userData)

    var authDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(userData);

    var poolData = {
        UserPoolId: AWS_USER_POOL_ID,
        ClientId: AWS_CLIENT_ID
    };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var userAuth = {
        Username : userData['Username'],
        Pool: userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userAuth);

    console.log(cognitoUser);

    cognitoUser.authenticateUser(authDetails, {
        onSuccess : function(result) {

            console.log(result);
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
            console.log('idToken + ' + result.idToken.jwtToken);



            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : AWS_ID_POOL,
                Logins : {
                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_94hEwNlgs' : result.idToken.jwtToken
                }
            });

            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Successfully logged!');
                }
            });

            window.location = '/upload';
        },

        onFailure : function(err) {
            console.log(err);
        },
    });


}

var signOut = function() {
    var poolData = {
        UserPoolId: AWS_USER_POOL_ID,
        ClientId: AWS_CLIENT_ID
    };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var currentUser = userPool.getCurrentUser();

    if(currentUser != null) {
        currentUser.signOut();
        window.location = '/'
    }
}

$(document).ready(function() {
    $('#signInSubmit').on('click', function(event){
        event.preventDefault();
        userSignIn($('#signIn').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {}));
    });

    $('#signOutSubmit').on('click', function(event) {
        event.preventDefault();
        signOut();
    });
});
