/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import Loader from '../../common/Loader';
import OTPModal from '../../common/OTPModal';
import { fetchLoginUser } from '../../../redux/actions/user/userLogin';
import { fetchUserOtp } from '../../../redux/actions/user/userOtp';
import { ErrorMSG } from '../../../utils/utils';
import { initialValueLoginEmail, initialValueLoginPhone } from '../../../utils/initialValues';
import {
    validationSchemaForLoginEmail,
    validationSchemaForLoginPhone,
} from '../../../utils/validation';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Toastify from '../../common/Toastify';
import {
    ERROR_TOASTIFY_TYPE,
    OTP_SEND_FAILURE,
    OTP_SEND_SUCCESS,
    SUCCESS_TOASTIFY_TYPE,
} from '../../../utils/enum';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import google from '../../../assets/images/google.png';
import facebook from '../../../assets/images/facebook.png';
import apple from '../../../assets/images/apple.png';

const Login = ({ intl }) => {
    const email = intl.formatMessage({
        id: 'Place_holder.Enter Your Email Address',
        defaultMessage: 'Enter Your Email Address',
    });
    const phone = intl.formatMessage({
        id: 'Place_holder.Enter Your Phone Number',
        defaultMessage: 'Enter Your Phone Number',
    });
    const dispatch = useDispatch();
    const [inputChange, setInputChange] = useState(true);
    const changeField = () => {
        setInputChange(!inputChange);
    };

    const { countryData, loginLoading, loginSuccessData, loginError } = useSelector((state) => ({
        countryData: state?.countryData?.payload?.data,
        loginLoading: state?.loginUser?.loading,
        loginSuccessData: state?.loginUser?.payload?.data,
        loginError: state?.loginUser?.error,
    }));

    useEffect(() => {
        if (loginSuccessData) {
            Toastify(OTP_SEND_SUCCESS, SUCCESS_TOASTIFY_TYPE);
        }
        if (loginError) {
            Toastify(OTP_SEND_FAILURE, ERROR_TOASTIFY_TYPE);
        }
    }, [loginSuccessData, loginError]);

    const onSubmitLogin = (values) => {
        const country = values?.countryCode?.split(',');
        const phoneData = {
            value: values?.phone,
            language_id: 1,
            country_code: country?.[0],
            short_code: country?.[1],
        };
        const emailData = {
            value: values?.email,
            language_id: 1,
        };

        const apiData = inputChange ? emailData : phoneData;
        dispatch(fetchLoginUser(apiData));
    };

    const otpData = {
        type: loginSuccessData?.[0]?.type,
        user_id: loginSuccessData?.[0]?.id,
    };

    const otpLoginSubmitButton = (data) => {
        dispatch(fetchUserOtp(data));
    };

    return (
        <div>
            {loginLoading ? (
                <Loader loading={loginLoading} />
            ) : !loginSuccessData ? (
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            <FormattedMessage id="Home_page.Login" defaultMessage="Login" />
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
                                <img src={google} className="PopupBtnWidth" alt="" />
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
                                <img src={facebook} className="PopupBtnWidth" alt="" />
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
                                <img src={apple} className="PopupBtnWidth" alt="" />
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
                            initialValues={
                                inputChange ? initialValueLoginEmail : initialValueLoginPhone
                            }
                            onSubmit={onSubmitLogin}
                            validationSchema={
                                inputChange
                                    ? validationSchemaForLoginEmail
                                    : validationSchemaForLoginPhone
                            }
                            enableReinitialize={true}
                        >
                            {() => {
                                return (
                                    <Form>
                                        <div className="form-group mt-3 mb-0">
                                            <div
                                                className="nav nav-tabs mb-2"
                                                id="nav-tab"
                                                role="tablist"
                                            >
                                                <button
                                                    className={
                                                        inputChange ? 'nav-link active' : 'nav-link'
                                                    }
                                                    id="nav-home-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#nav-home"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="nav-home"
                                                    aria-selected={inputChange ? 'true' : 'false'}
                                                    onClick={changeField}
                                                >
                                                    <FormattedMessage
                                                        id="Home_page.Email"
                                                        defaultMessage="Email"
                                                    />
                                                </button>
                                                <button
                                                    className={
                                                        inputChange ? 'nav-link' : 'nav-link active'
                                                    }
                                                    id="nav-profile-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#nav-profile"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="nav-profile"
                                                    aria-selected={inputChange ? 'false' : 'true'}
                                                    onClick={changeField}
                                                >
                                                    <FormattedMessage
                                                        id="Home_page.Phone"
                                                        defaultMessage="Phone"
                                                    />
                                                </button>
                                            </div>
                                            {inputChange ? (
                                                <>
                                                    <label htmlFor="email" className="TextColor">
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
                                                        aria-describedby="emailHelp"
                                                        placeholder={email}
                                                    />
                                                    {inputChange ? ErrorMSG('email') : ' '}
                                                </>
                                            ) : (
                                                <>
                                                    <label htmlFor="input" className="TextColor">
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
                                                            type="number"
                                                            className="form-control"
                                                            id="phone"
                                                            name="phone"
                                                            aria-describedby="emailHelp"
                                                            placeholder={phone}
                                                            maxlength="10"
                                                        />
                                                    </div>
                                                    {ErrorMSG('countryCode')}
                                                    {ErrorMSG('phone')}
                                                </>
                                            )}
                                        </div>
                                        <div className="modal-footer ModalHomeFooter">
                                            <button
                                                type="submit"
                                                className="btn btn-danger WidthLoginBtn"
                                            >
                                                <FormattedMessage
                                                    id="Home_page.Login"
                                                    defaultMessage="Login"
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
                <OTPModal otpData={otpData} otpSubmitButton={otpLoginSubmitButton} />
            )}
        </div>
    );
};

export default injectIntl(Login);
