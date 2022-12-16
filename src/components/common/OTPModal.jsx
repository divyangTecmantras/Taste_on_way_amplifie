/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import OtpInput from 'react-otp-input';
import nextImag from '../../assets/images/next.png';

const OTPModal = ({ otpData, otpSubmitButton }) => {
    const [otpValue, setOtpValue] = useState('');
    const otpHandleChange = (value) => {
        setOtpValue(value);
    };

    const otpAPIValue = { ...otpData, otp: otpValue };

    return (
        <div>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            <FormattedMessage
                                id="common_page.OTP Verification"
                                defaultMessage="OTP Verification"
                            />
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5 className="modal-title" id="exampleModalLabel">
                            <FormattedMessage
                                id="common_page.Enter OTP"
                                defaultMessage="Enter OTP"
                            />
                        </h5>
                        <form>
                            <div className="form-group mt-3 mb-0">
                                <div className="row justify-content-center align-items-center ">
                                    <OtpInput
                                        containerStyle={{
                                            justifyContent: 'Center',
                                            alignItems: 'center',
                                            width: '100%',
                                            paddingRight: 20,
                                            paddingLeft: 20,
                                        }}
                                        inputStyle={{
                                            width: '80%',
                                            padding: 8,
                                        }}
                                        value={otpValue}
                                        onChange={otpHandleChange}
                                        numInputs={6}
                                        // separator={<span>-</span>}
                                        isInputNum={true}
                                    />
                                </div>
                                <div className="row mt-2">
                                    <div className="col-sm-12">
                                        <a className="BoxLink">
                                            <FormattedMessage
                                                id="common_page.Resend OTP"
                                                defaultMessage="Resend OTP"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer ModalHomeFooter">
                        <button
                            type="button"
                            className={
                                otpValue.length === 6
                                    ? 'btn btn-danger pull-left'
                                    : 'btn btn-danger pull-left disabled'
                            }
                            data-dismiss="modal"
                            onClick={() => otpSubmitButton(otpAPIValue)}
                        >
                            <FormattedMessage id="common_page.Continue" defaultMessage="Continue" />
                            <img src={nextImag} alt="" className="NextIconModal" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPModal;
