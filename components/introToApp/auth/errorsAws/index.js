export const errListAws = {
    passwordGreaterThanOrEqualTo6_0: "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6",
    passwordGreaterThanOrEqualTo6_1: "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\\S]+.*[\\S]+$".toString(),
    passwordMustHaveNumericCharacters: "Password did not conform with policy: Password must have numeric characters",
    usernameShouldBeAnEmail: "Username should be an email.",
    passwordNotLongEnough: "Password did not conform with policy: Password not long enough",
    accountExits: "An account with the given email already exists.",
    invalidCode: "Invalid verification code provided, please try again.",
    numberPhoneExists: "An account with the given phone_number already exists.",
    AttemptLimitExceeded: "Attempt limit exceeded, please try after some time.",
    "combinationNotFound": "Username/client id combination not found."
}