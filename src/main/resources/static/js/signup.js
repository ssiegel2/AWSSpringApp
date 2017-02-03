var userSignUp = function(userData) {

    var userPool = getUserPool();

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
