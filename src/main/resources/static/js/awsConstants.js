// Declare Constants
AWS_REGION = 'us-east-1';
AWS_ID_POOL = 'us-east-1:9f63f2ad-0f3a-4e01-af28-f46e0c765242';

AWS_USER_POOL_ID = 'us-east-1_94hEwNlgs';
AWS_CLIENT_ID = 'fhffgj4gdn2kk9dbn6gn9h4da';


// Initialize the Amazon Cognito credentials provider
AWS.config.region = AWS_REGION; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_ID_POOL,
});

AWSCognito.config.region = 'AWS_REGION';

// Get the AWS Cognito User Pool
var getUserPool = function() {
    var poolData = {
        UserPoolId: AWS_USER_POOL_ID,
        ClientId: AWS_CLIENT_ID
    };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    return userPool;
}


// Utility Functions

// get the fields from an html form as an object
var getFormFields = function(obj, item) {
    obj[item.name] = item.value;
    return obj;
}

var errorCheck = function(err) {
    $('#userMessage').html(err.message);
    $('#userMessage').show();
}

// get the url querey string params as an object
var getURLQuereyParams = function() {
    var query = window.location.search;
    var paramObj = {}

    var keys = query.substring(1).split('&');
    keys.reduce(function(obj, param) {
        var key = param.substring(0, param.indexOf('='));
        var value = param.substring(param.indexOf('=') + 1)
        obj[key] = value;
        return obj;
    }, paramObj);

    return paramObj;
}
