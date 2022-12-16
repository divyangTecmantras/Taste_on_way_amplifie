import React, { useState, useRef, useEffect } from 'react';
import Toastify from '../../common/Toastify';
import {
    CUSTOMER_SUPPORT_DATA_FAIL,
    CUSTOMER_SUPPORT_DATA_SUCCESS,
    CUSTOMER_SUPPORT_DATA_LOADING,
    ERROR_TOASTIFY_TYPE,
    INFO_TOASTIFY_TYPE,
    SUCCESS_TOASTIFY_TYPE,
} from '../../../utils/enum';
import { fetchCustomerSupport } from '../../../redux/actions/user/customerSupport';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import addPhoto from '../../../assets/images/add-photo.png';
import './CustomerSupport.css';
const CustomerSupport = () => {
    const [img, setImg] = useState([]);
    const comment = useRef();
    const option = useRef();
    const dispatch = useDispatch();
    const optionValue = [
        {
            lable: (
                <FormattedMessage id="UserProfile_page.Food issue" defaultMessage="Food issue" />
            ),
            value: 'Food issue',
        },
        {
            lable: (
                <FormattedMessage id="UserProfile_page.Order issue" defaultMessage="Order issue" />
            ),
            value: 'Order issue',
        },
        {
            lable: (
                <FormattedMessage
                    id="UserProfile_page.Delivery issue"
                    defaultMessage="Delivery issue"
                />
            ),
            value: 'Delivery issue',
        },
        {
            lable: (
                <FormattedMessage
                    id="UserProfile_page.Payment issue"
                    defaultMessage="Payment issue"
                />
            ),
            value: 'Payment issue',
        },
        {
            lable: (
                <FormattedMessage
                    id="UserProfile_page.Refund issue"
                    defaultMessage="Refund issue"
                />
            ),
            value: 'Refund issue',
        },
        {
            lable: (
                <FormattedMessage
                    id="UserProfile_page.Order Itemes issue"
                    defaultMessage="Order Itemes issue"
                />
            ),
            value: 'Order Itemes issue',
        },
        {
            lable: (
                <FormattedMessage
                    id="UserProfile_page.Packaging issue"
                    defaultMessage="Packaging issue"
                />
            ),
            value: 'Packaging issue',
        },
        {
            lable: (
                <FormattedMessage
                    id="UserProfile_page.Technical issue"
                    defaultMessage="Technical issue"
                />
            ),
            value: 'Technical issue',
        },
        {
            lable: (
                <FormattedMessage
                    id="UserProfile_page.Coupon issue"
                    defaultMessage="Coupon issue"
                />
            ),
            value: 'Coupon issue',
        },
        {
            lable: (
                <FormattedMessage id="UserProfile_page.Other issue" defaultMessage="Other issue" />
            ),
            value: 'Other issue',
        },
    ];

    const { customerSupportSuccess, customerSupportError, customerSupportLoading } = useSelector(
        (state) => ({
            customerSupportSuccess: state?.customerSupport?.payload?.data,
            customerSupportError: state?.customerSupport?.error,
            customerSupportLoading: state?.customerSupport?.loading,
        }),
    );

    useEffect(() => {
        if (customerSupportSuccess) {
            Toastify(CUSTOMER_SUPPORT_DATA_SUCCESS, SUCCESS_TOASTIFY_TYPE);
        }
        if (customerSupportError) {
            Toastify(CUSTOMER_SUPPORT_DATA_FAIL, ERROR_TOASTIFY_TYPE);
        }
        if (customerSupportLoading) {
            Toastify(CUSTOMER_SUPPORT_DATA_LOADING, INFO_TOASTIFY_TYPE);
        }
    }, [customerSupportSuccess, customerSupportError, customerSupportLoading]);

    const handleImage = (event) => {
        setImg([event.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formas = new FormData();
        formas.append('type', option.current.value);
        formas.append('comments', comment.current.value);
        [...img[0]].map((d) => {
            formas.append('image[]', d, d.name);
        });
        dispatch(fetchCustomerSupport(formas));
    };

    return (
        <>
            <div
                className="tab-pane fade"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
            >
                <h2 className="respmargtopprof">
                    <FormattedMessage
                        id="UserProfile_page.Customer Support"
                        defaultMessage="Customer Support"
                    />
                </h2>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card ProfileWidthcard mt-4">
                            <div className="card-body ProfileCardBody text-center">
                                <img
                                    src={addPhoto}
                                    multiple
                                    className="IconAddress mt-4"
                                    alt="addPhoto"
                                />
                                <h5 className="card-title mt-2">
                                    <FormattedMessage
                                        id="UserProfile_page.Upload Image"
                                        defaultMessage="Upload Image"
                                    />
                                </h5>
                            </div>
                        </div>
                        <form className="mt-4">
                            <div className="form-group">
                                <h5 htmlFor="exampleInputEmail1">
                                    <FormattedMessage
                                        id="UserProfile_page.Issue Type"
                                        defaultMessage="Issue Type"
                                    />
                                </h5>
                                <select id="inputState" className="form-control mt-3" ref={option}>
                                    <option selected={true} className="selectoption">
                                        <FormattedMessage
                                            id="UserProfile_page.Select Issue Type"
                                            defaultMessage="Select Issue Type"
                                        />
                                    </option>
                                    {optionValue.map((option) => {
                                        return <option key={option.value}>{option.lable}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group mt-4">
                                <h5 htmlFor="exampleInputEmail1">
                                    <FormattedMessage
                                        id="UserProfile_page.Add Comment"
                                        defaultMessage="Add Comment"
                                    />
                                </h5>
                                <textarea
                                    className="form-control mt-3"
                                    aria-label="With textarea"
                                    rows={5}
                                    ref={comment}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">
                                    <FormattedMessage
                                        id="UserProfile_page.Example file input"
                                        defaultMessage="Example file input"
                                    />
                                </label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="exampleFormControlFile1"
                                    onChange={handleImage}
                                    multiple="multiple"
                                />
                            </div>
                            <div className="mb-5">
                                <button onClick={(e) => handleSubmit(e)} className="btn btn-danger">
                                    <FormattedMessage
                                        id="UserProfile_page.Send"
                                        defaultMessage="Send"
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerSupport;
