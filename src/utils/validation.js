import * as Yup from 'yup';

const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const validationSchemaForSignUp = Yup.object({
    firstName: Yup.string().required('Please Provide Your First Name'),
    lastName: Yup.string().required('Please Provide Your First Name'),
    email: Yup.string().email('Enter Valid Email').required('Please Provide Your Email'),
    phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .length(10)
        .required('Please enter your Mobile Number'),
    countryCode: Yup.string().required('Please Select'),
});

export const validationSchemaForLoginEmail = Yup.object({
    email: Yup.string().email('Enter Valid Email').required('Please Provide Your Email'),
});

export const validationSchemaForLoginPhone = Yup.object({
    countryCode: Yup.string().required('Please Select'),
    phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .length(10)
        .required('Please enter your Mobile Number'),
});
