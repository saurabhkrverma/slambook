import * as yup from "yup";


export const  postRequestValidationSchema = yup.object().shape({
    submitterName: yup.string().required("your name is required"),
    submitterEmail: yup.string().required().matches(/^\S+@\S+\.\S+$/, 'not a valid email'),
    questionnaire: yup.array()
        .of(
            yup.object().shape({
                question: yup.string(),
                answer: yup.string().required("Required")
            })
        )
});


export const  postRequestWithOTPValidationSchema = yup.object().shape({
    submitterName: yup.string().required("your name is required"),
    submitterEmail: yup.string().required().matches(/^\S+@\S+\.\S+$/, 'not a valid email'),
    questionnaire: yup.array()
        .of(
            yup.object().shape({
                question: yup.string(),
                answer: yup.string().required("Required")
            })
        ),
    otpValue: yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, 'Must be exactly 6 digits')
        .max(6, 'Must be exactly 6 digits')
});
