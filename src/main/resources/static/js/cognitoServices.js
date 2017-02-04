// Register a user into AWS Cognito
var userSignUp = function(userData) {

    var userPool = getUserPool();

    // Users require an email address for verification
    var attributeList = [];

    // Email data
    var dataEmail = {
        Name: 'email',
        Value: userData['email']
    };

    // Email attribute object
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    // Sign the user up for the
    userPool.signUp(userData['username'], userData['password'], attributeList, null, function(err, result) {
        if(err) {
            //console.log(err);
            errorCheck(err);
            return;
        }
        window.location = '/verify?username=' + userData['username'];

    });

}

// Sign the user into AWS Cognito
var userSignIn = function(userData) {

    // Get the User Awuthentication Details
    var authDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(userData);

    var userPool = getUserPool();

    // User Awuthentication Data
    var userAuth = {
        Username : userData['Username'],
        Pool: userPool
    };

    // Get the User
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userAuth);

    // Sign user in
    cognitoUser.authenticateUser(authDetails, {
        onSuccess : function(result) {

            AWS.config.credentials.clearCachedId();

            // Update AWS credentials
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : AWS_ID_POOL,
                Logins : {
                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_94hEwNlgs' : result.idToken.jwtToken
                }
            });

            // refresh AWS credentials
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    //console.error(error);
                    errorCheck(error);
                } else {
                    console.log('Successfully logged!');
                }
            });

            // Redirect to s3 upload page
            window.location = '/upload';
        },

        onFailure : function(err) {
            //aconsole.log(err);
            errorCheck(err);
        },
    });


}

// Verify user via email using confirmation code
var verify = function(userData) {

    var userPool = getUserPool();

    // User Awuthentication Data
    var userAuth = {
        Username : userData['username'],
        Pool: userPool
    };

    // Get user
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userAuth);

    // Confirm user registration using confirmation code
    cognitoUser.confirmRegistration(userData['code'], true, function(err, result) {
        if(err) {
            //console.log(err);
            errorCheck(err);
            return;
        }
        console.log(result);
        window.location = '/?verify=true'
    });
}

// Sign the user out
var signOut = function() {

    var userPool = getUserPool();

    var currentUser = userPool.getCurrentUser();

    if(currentUser != null) {
        currentUser.signOut();
        window.location = '/'
    }
}
