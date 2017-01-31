// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:9f63f2ad-0f3a-4e01-af28-f46e0c765242',
});

AWSCognito.config.region = 'us-east-1';

var poolData = {
    UserPoolId: 'us-east-1_n2uS6X7gU',
    ClientId: '3ggiautleipa5l9m48l63l7f91'
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

var attributeList = [];

var dataName = {
    Name: 'name',
    Value: 'Sam'
};

var attributeName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName);

attributeList.push(attributeName);

userPool.signUp('username', 'Password123!', attributeList, null, function(err, result) {
    if(err) {
        console.log(err);
        return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());

});