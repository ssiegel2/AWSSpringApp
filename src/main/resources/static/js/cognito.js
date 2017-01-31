// Declare Constants
AWS_REGION = 'us-east-1';
AWS_ID_POOL = AWS_REGION + ':9f63f2ad-0f3a-4e01-af28-f46e0c765242';

AWS_USER_POOL_ID = 'us-east-1_n2uS6X7gU';
AWS_CLIENT_ID = '3ggiautleipa5l9m48l63l7f91';


// Initialize the Amazon Cognito credentials provider
AWS.config.region = AWS_REGION; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_ID_POOL,
});

AWSCognito.config.region = 'AWS_REGION';
