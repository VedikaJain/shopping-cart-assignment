
const required = value => value ? '' : 'Required';
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    ? 'Invalid email address' : '';
const password = value => (value && !/^(?=.*[A-Za-z])(?=.*\d)(?!.*\s)[A-Za-z\d]{6,}$/i.test(value))
    ? 'Password should be minimum 6 characters long, alphanumeric and without spaces.' : '';
const confirmPassword = (value1, value2) => (value1.valueOf().trim() === value2.valueOf().trim())
    ? '' : 'Password and Confirm Password must match';

export const validate = (checkIf, value, ...otherValues) => {
    switch(checkIf) {
        case 'required': return required(value);
        case 'email': return email(value);
        case 'password': return password(value);
        case 'confirmPassword': return confirmPassword(value, otherValues[0]);
        default: return 'Invalid';
    }
}