var BUCKET_NAME = 'awsspringapp';
var API_VERSION = '2012-10-17';

var poolData = {
    UserPoolId: AWS_USER_POOL_ID,
    ClientId: AWS_CLIENT_ID
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var currentUser = userPool.getCurrentUser();

if(currentUser != null) {
    currentUser.getSession(function(err, session) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('session validity: ' + session.isValid());

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : AWS_ID_POOL,
            Logins : {
                 'cognito-idp.us-east-1.amazonaws.com/us-east-1_94hEwNlgs' : session.idToken.jwtToken
            }
        });



        var s3 = new AWS.S3({
            apiVersion: API_VERSION,
            params : {Bucket: BUCKET_NAME}
        });

        // Call S3 to list current buckets
        s3.listObjects(function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Bucket List", data);
            }
        });

    });
}
