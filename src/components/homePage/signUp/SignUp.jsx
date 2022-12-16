import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { initialValuesForSignUp } from '../../../utils/initialValues';
import { validationSchemaForSignUp } from '../../../utils/validation';
import { ErrorMSG } from '../../../utils/utils';
import { fetchRegisterUser } from '../../../redux/actions/user/userRegister';
import { fetchUserOtp } from '../../../redux/actions/user/userOtp';
import Loader from '../../common/Loader';
import OTPModal from '../../common/OTPModal';
import google from '../../../assets/images/google.png';
import facebook from '../../../assets/images/facebook.png';
import apple from '../../../assets/images/apple.png';
import Toastify from '../../common/Toastify';
import {
    ERROR_TOASTIFY_TYPE,
    OTP_SEND_MOBILE_SUCCESS,
    SIGNUP_NUMBER_ERROR,
    SUCCESS_TOASTIFY_TYPE,
} from '../../../utils/enum';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';

const SignUp = ({ intl }) => {
    const phone = intl.formatMessage({
        id: 'Place_holder.Enter Your Phone Number',
        defaultMessage: 'Enter Your Phone Number',
    });
    const email = intl.formatMessage({
        id: 'Place_holder.Enter Your Email Address',
        defaultMessage: 'Enter Your Email Address',
    });
    const lname = intl.formatMessage({
        id: 'Place_holder.Enter Your Last Name',
        defaultMessage: 'Enter Your Last Name',
    });
    const fname = intl.formatMessage({
        id: 'Place_holder.Enter Your First Name',
        defaultMessage: 'Enter Your First Name',
    });
    const dispatch = useDispatch();
    const { countryData, signUpLoading, signUpSuccessData, signUpError } = useSelector((state) => ({
        countryData: state?.countryData?.payload?.data,
        signUpLoading: state?.registerUser?.loading,
        signUpSuccessData: state?.registerUser?.payload?.data,
        signUpError: state?.registerUser?.error,
    }));

    const otpData = {
        type: signUpSuccessData?.[0]?.type,
        user_id: signUpSuccessData?.[0]?.id,
    };

    useEffect(() => {
        if (signUpError) {
            Toastify(SIGNUP_NUMBER_ERROR, ERROR_TOASTIFY_TYPE);
        }
        if (signUpSuccessData) {
            Toastify(OTP_SEND_MOBILE_SUCCESS, SUCCESS_TOASTIFY_TYPE);
        }
    }, [signUpError, signUpSuccessData]);

    const onSubmitSignUp = (values) => {
        const country = values?.countryCode?.split(',');
        const apiData = {
            name: `${values?.firstName} ${values?.lastName}`,
            email: values?.email,
            mobile_number: values?.phone,
            country_code: country?.[0],
            short_code: country?.[1],
            language_id: 1,
        };
        dispatch(fetchRegisterUser(apiData));
    };
    const otpSignUpSubmitButton = (data) => {
        dispatch(fetchUserOtp(data));
    };

    return (
        <div>
            {signUpLoading ? (
                <Loader loading={signUpLoading} />
            ) : !signUpSuccessData ? (
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            <FormattedMessage id="Home_page.SignUp" defaultMessage="Signup" />
                        </h5>
                        <a
                            href="/"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </a>
                    </div>
                    <div className="modal-body">
                        <div>
                            <a
                                href="/"
                                type="button"
                                className="btn btn-primary PopupBtnLogin"
                                data-dismiss="modal"
                            >
                                <img src={google} className="PopupBtnWidth" alt="" />{' '}
                                <FormattedMessage
                                    id="Home_page.Continue with google"
                                    defaultMessage="Continue with google"
                                />
                            </a>
                        </div>
                        <div className="mt-3">
                            <a
                                href="/"
                                type="button"
                                className="btn BtnFacebook PopupBtnLogin"
                                data-dismiss="modal"
                            >
                                <img src={facebook} className="PopupBtnWidth" alt="" />{' '}
                                <FormattedMessage
                                    id="Home_page.Continue with facebook"
                                    defaultMessage="Continue with facebook"
                                />
                            </a>
                        </div>
                        <div className="mt-3">
                            <a
                                href="/"
                                type="button"
                                className="btn BtnApple PopupBtnLogin"
                                data-dismiss="modal"
                            >
                                <img src={apple} className="PopupBtnWidth" alt="" />{' '}
                                <FormattedMessage
                                    id="Home_page.Continue with Apple"
                                    defaultMessage="Continue with Apple"
                                />
                            </a>
                        </div>

                        <div
                            style={{
                                float: 'left',
                                width: '44%',
                                marginTop: 6,
                            }}
                        >
                            <hr />
                        </div>
                        <div
                            style={{
                                float: 'right',
                                width: '44%',
                                marginTop: 6,
                            }}
                        >
                            <hr />
                        </div>
                        <span className="LineHeightDivider TextColor">
                            <FormattedMessage id="Home_page.Or" defaultMessage="Or" />
                        </span>

                        <Formik
                            initialValues={initialValuesForSignUp}
                            onSubmit={onSubmitSignUp}
                            validationSchema={validationSchemaForSignUp}
                            enableReinitialize={true}
                        >
                            {() => {
                                return (
                                    <Form>
                                        <div className="form-group mt-3 mb-0">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <label
                                                        htmlFor="exampleInputEmail1"
                                                        className="TextColor"
                                                    >
                                                        <FormattedMessage
                                                            id="Home_page.First name"
                                                            defaultMessage="First name"
                                                        />
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        name="firstName"
                                                        placeholder={fname}
                                                    />
                                                    {ErrorMSG('firstName')}
                                                </div>
                                                <div className="col-lg-6">
                                                    <label
                                                        htmlFor="exampleInputEmail1"
                                                        className="TextColor"
                                                    >
                                                        <FormattedMessage
                                                            id="Home_page.Last name"
                                                            defaultMessage="Last name"
                                                        />
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        name="lastName"
                                                        placeholder={lname}
                                                    />
                                                    {ErrorMSG('lastName')}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-lg-12">
                                                    <label
                                                        htmlFor="exampleInputEmail1"
                                                        className="TextColor"
                                                    >
                                                        <FormattedMessage
                                                            id="Home_page.Email Address"
                                                            defaultMessage="Email Address"
                                                        />
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        name="email"
                                                        placeholder={email}
                                                    />
                                                    {ErrorMSG('email')}
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-lg-12">
                                                    <label
                                                        htmlFor="exampleInputEmail1"
                                                        className="TextColor"
                                                    >
                                                        <FormattedMessage
                                                            id="Home_page.Phone Number"
                                                            defaultMessage="Phone Number"
                                                        />
                                                    </label>
                                                    <div className="d-flex direction-row">
                                                        <Field
                                                            as="select"
                                                            className="form-control col-3  scrollable-menu"
                                                            name="countryCode"
                                                        >
                                                            <option value={null}>
                                                                <FormattedMessage
                                                                    id="Home_page.Select Code"
                                                                    defaultMessage="Select Code"
                                                                />
                                                            </option>
                                                            {countryData &&
                                                                countryData.map((data) => {
                                                                    const valueOfInput = [
                                                                        data?.country_code,
                                                                        data?.short_code,
                                                                    ];
                                                                    return (
                                                                        <option
                                                                            key={data?.id}
                                                                            value={valueOfInput}
                                                                        >
                                                                            {`+${data?.country_code}-
                                                                                            ${data?.name}`}
                                                                        </option>
                                                                    );
                                                                })}
                                                        </Field>
                                                        <Field
                                                            type="Number"
                                                            className="form-control"
                                                            id="phone"
                                                            name="phone"
                                                            aria-describedby="emailHelp"
                                                            placeholder={phone}
                                                        />
                                                    </div>
                                                    {ErrorMSG('countryCode')}
                                                    {ErrorMSG('phone')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer ModalHomeFooter">
                                            <button
                                                type="submit"
                                                className="btn btn-danger WidthLoginBtn"
                                            >
                                                <FormattedMessage
                                                    id="Home_page.SignUp"
                                                    defaultMessage="Signup"
                                                />
                                            </button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            ) : (
                <OTPModal otpData={otpData} otpSubmitButton={otpSignUpSubmitButton} />
            )}
        </div>
    );
};

export default injectIntl(SignUp);
