var uploadFile = function(name, file) {

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

            console.log(AWS_ID_POOL);

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : AWS_ID_POOL,
                Logins : {
                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_94hEwNlgs' : session.idToken.jwtToken
                }
            });

        });

        AWS.config.credentials.refresh((error) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log('Successfully logged!');
            }
        });
    }

    var s3 = new AWS.S3({
        apiVersion: API_VERSION,
        params : {Bucket: BUCKET_NAME}
    });

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

$(document).ready(function() {

    $('#uploadSubmit').on('click', function(event){
        event.preventDefault();
        var file = $('#uploadInput')[0].files[0];
        uploadFile(file.name, file);
    });


});
