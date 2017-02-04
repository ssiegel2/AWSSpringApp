$(document).ready(function() {

    var userPool = getUserPool();

    var currentUser = userPool.getCurrentUser();

    if(currentUser != null) {

        // update AWS credentials
        currentUser.getSession(function(err, session) {
            if(err) {
                console.log(err);
                return;
            }

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : AWS_ID_POOL,
                Logins : {
                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_94hEwNlgs' : session.idToken.jwtToken
                }
            });

        });

        // Refresh AWS credentials
        AWS.config.credentials.refresh((error) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log('Successfully logged!');
            }
        });
    }
});

// Upload a file to AWS s3
var uploadFile = function(name, file) {
    // s3 Bucket name and api version
    var BUCKET_NAME = 'awsspringapp';
    var API_VERSION = '2012-10-17';

    // Get AWS s3 instance
    var s3 = new AWS.S3({
        apiVersion: API_VERSION,
        params : {Bucket: BUCKET_NAME}
    });

    // upload the file to s3
    s3.upload({
        Key : name,
        Body : file,
        ACL : 'public-read'
    }, function(err, data) {
        if(err) {
            console.log('File upload failed', err);
            return;
        }
        console.log('File upload successful');
    });

}
