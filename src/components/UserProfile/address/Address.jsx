import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { addUserAddress } from '../../../redux/actions/user/addUserAddress';
import { deleteUserAddress } from '../../../redux/actions/user/deleteUserAddress';
import Toastify from '../../common/Toastify';
import {
    ADD_USER_ADDRESS_ERROR,
    ADD_USSER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_FAILURE,
    DELETE_USER_ADDRESS_SUCCESS,
    ERROR_TOASTIFY_TYPE,
    SUCCESS_TOASTIFY_TYPE,
} from '../../../utils/enum';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import addAddress from '../../../assets/images/add_address.png';
import './Address.css';

const Address = ({ intl }) => {
    const zip = intl.formatMessage({ id: 'Place_holder.380015', defaultMessage: '380015' });
    const city = intl.formatMessage({ id: 'Place_holder.Ahmedabad', defaultMessage: 'Ahmedabad' });
    const area = intl.formatMessage({ id: 'Place_holder.shyamal', defaultMessage: 'shyamal' });
    const address = intl.formatMessage({
        id: 'Place_holder.1006, hospitality exacel',
        defaultMessage: '1006, hospitality exacel',
    });
    const dispatch = useDispatch();
    const [edit, setEdit] = useState();
    const [deleteShow, setDeleteShow] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(!show);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDeleteClose = () => setDeleteShow(false);

    const {
        userAddress,
        deleteUserAddresssuccess,
        deleteUserAddresserror,
        addUserAddresssuccess,
        addUserAddressError,
    } = useSelector((state) => ({
        userAddress: state?.userAddress?.payload?.data,
        deleteUserAddresssuccess: state?.deleteAddress?.payload?.message,
        deleteUserAddresserror: state?.deleteAddress?.error,
        addUserAddresssuccess: state?.addUserAddress?.payload?.data,
        addUserAddressError: state?.addUserAddress?.error,
    }));

    const deleteAddress = (id) => {
        const addId = {
            address_id: id,
        };

        dispatch(deleteUserAddress(addId));
    };

    useEffect(() => {
        if (deleteUserAddresssuccess) {
            Toastify(DELETE_USER_ADDRESS_SUCCESS, SUCCESS_TOASTIFY_TYPE);
        }
        if (deleteUserAddresserror) {
            Toastify(DELETE_USER_ADDRESS_FAILURE, ERROR_TOASTIFY_TYPE);
        }
        if (addUserAddresssuccess) {
            Toastify(ADD_USSER_ADDRESS_SUCCESS, SUCCESS_TOASTIFY_TYPE);
        }
        if (addUserAddressError) {
            Toastify(ADD_USER_ADDRESS_ERROR, ERROR_TOASTIFY_TYPE);
        }
    }, [
        deleteUserAddresssuccess,
        deleteUserAddresserror,
        addUserAddresssuccess,
        addUserAddressError,
    ]);

    const formik = useFormik({
        initialValues: {
            Address: edit?.address ? edit.address : '',
            Area: edit?.area ? edit.area : '',
            Landmark: edit?.land_mark ? edit.land_mark : '',
            City: edit?.city.name ? edit.city.name : '',
            Zip: edit?.pin_code ? edit.pin_code : '',
            AddressType: edit?.address_type
                ? edit.address_type === 'Work'
                    ? '2'
                    : edit.address_type === 'Home'
                    ? '1'
                    : '3'
                : '',
        },
        validationSchema: yup.object({
            Address: yup.string().required('Address is Required'),
            Area: yup.string().required('Area is Required'),
            Landmark: yup.string().required('Landmark is Required'),
            City: yup.string().required('City is Required'),
            Zip: yup.string().max(6, 'Please Enter Valid Zip Code').required('Zip is Required'),
            AddressType: yup.string().required('Please Select Address Type'),
        }),
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            const apiData = {
                city_name: values.City,
                address: values.Address,
                area: values.Area,
                land_mark: values.Landmark,
                pin_code: values.Zip,
                address_type: values.AddressType,
                latitude: '23.0120',
                longitude: '72.5108',
            };
            dispatch(addUserAddress(apiData));
            resetForm();
            setShow(!show);
        },
    });

    return (
        <>
            <div
                className="tab-pane fade ScrollbarHidden"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
            >
                <h2 className="respmargtopprof RespMargTop">My Address</h2>

                <div className="row">
                    {userAddress?.map((data) => (
                        <div className="col-lg-6" key={data.id}>
                            <div className="card mt-4">
                                <div className="card-body ProfileCardBody">
                                    <div className="FloatRightCheckbox">
                                        {data.is_delivery_address == 'Yes' ? (
                                            <input type="checkbox" name="" checked />
                                        ) : (
                                            <input type="checkbox" name="" />
                                        )}
                                    </div>
                                    <h5 className="card-title">{data.address_type}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {data.address},{data.area}
                                    </h6>
                                    <p className="card-text">
                                        {data.city.name} - {data.pin_code}
                                    </p>

                                    <button
                                        onClick={() => {
                                            setEdit(data);
                                            handleShow(data.id);
                                        }}
                                        type="button"
                                        className="card-link cardProfilelink"
                                        data-toggle="modal"
                                        data-target="#exampleModalAddAddress"
                                    >
                                        <FormattedMessage
                                            id="UserProfile_page.Edit"
                                            defaultMessage="Edit"
                                        />
                                    </button>

                                    <button
                                        onClick={handleDeleteShow}
                                        className="card-link ml-4 cardProfilelink"
                                    >
                                        <FormattedMessage
                                            id="UserProfile_page.Delete"
                                            defaultMessage="Delete"
                                        />
                                    </button>

                                    <Modal
                                        show={deleteShow}
                                        onHide={handleDeleteClose}
                                        backdrop="static"
                                    >
                                        <Modal.Header>
                                            <Modal.Title>
                                                <FormattedMessage
                                                    id="UserProfile_page.Delete Address"
                                                    defaultMessage="Delete Address"
                                                />
                                            </Modal.Title>
                                            <button
                                                type="button"
                                                className="close"
                                                onClick={handleDeleteClose}
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <FormattedMessage
                                                id="UserProfile_page.Are You Sure You Want to Delete This Address
                                            Permanently?"
                                                defaultMessage="Are You Sure You Want to Delete This Address
                                            Permanently?"
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button
                                                className="btn mr-2 btn-outline-danger btnradius"
                                                onClick={handleDeleteClose}
                                            >
                                                <FormattedMessage
                                                    id="UserProfile_page.NO"
                                                    defaultMessage="NO"
                                                />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteAddress(data.id);
                                                    handleDeleteClose();
                                                }}
                                                className="btn btn-danger btnradius"
                                            >
                                                <FormattedMessage
                                                    id="UserProfile_page.YES"
                                                    defaultMessage="YES"
                                                />
                                            </button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="col-lg-6">
                        <div className="card mt-4">
                            <div className="card-body ProfileCardBody text-center">
                                <div className="CursorPoint">
                                    <Button
                                        style={{
                                            background: 'white',
                                            border: 'none',
                                            color: 'black',
                                        }}
                                        onClick={() => handleShow()}
                                    >
                                        <img
                                            src={addAddress}
                                            className="IconAddress mt-4"
                                            alt="addAddress"
                                        />
                                        <h5 className="card-title mt-2">
                                            <FormattedMessage
                                                id="UserProfile_page.Add New Address"
                                                defaultMessage="Add New Address"
                                            />
                                        </h5>
                                    </Button>
                                </div>

                                <Modal show={show} onHide={handleClose} animation={false}>
                                    <div className="modal-content ContentLeft">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="exampleModalLabel">
                                                <FormattedMessage
                                                    id="UserProfile_page.Add New Address"
                                                    defaultMessage="Add New Address"
                                                />
                                            </h4>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span
                                                    onClick={() => setShow(!show)}
                                                    aria-hidden="true"
                                                >
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row AddAddressModal">
                                                <div className="col-lg-12">
                                                    <form onSubmit={formik.handleSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="inputAddress">
                                                                <FormattedMessage
                                                                    id="UserProfile_page.Address"
                                                                    defaultMessage="Address"
                                                                />
                                                            </label>
                                                            <input
                                                                name="Address"
                                                                type="text"
                                                                className="form-control AddAddressModal"
                                                                id="inputAddress"
                                                                placeholder={address}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.Address}
                                                            />
                                                            {formik.errors.Address && (
                                                                <p style={{ color: 'red' }}>
                                                                    {formik.errors.Address}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="inputAddress2">
                                                                <FormattedMessage
                                                                    id="UserProfile_page.Area"
                                                                    defaultMessage="Area"
                                                                />
                                                            </label>
                                                            <input
                                                                name="Area"
                                                                type="text"
                                                                className="form-control AddAddressModal"
                                                                id="inputAddress2"
                                                                placeholder={area}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.Area}
                                                            />
                                                            {formik.errors.Area && (
                                                                <p style={{ color: 'red' }}>
                                                                    {formik.errors.Area}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="inputAddress2">
                                                                <FormattedMessage
                                                                    id="UserProfile_page.Landmark"
                                                                    defaultMessage="Landmark"
                                                                />
                                                            </label>
                                                            <input
                                                                name="Landmark"
                                                                type="text"
                                                                className="form-control AddAddressModal"
                                                                id="inputAddress2"
                                                                placeholder={city}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.Landmark}
                                                            />
                                                            {formik.errors.Landmark && (
                                                                <p style={{ color: 'red' }}>
                                                                    {formik.errors.Landmark}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="inputCity">
                                                                    <FormattedMessage
                                                                        id="UserProfile_page.City"
                                                                        defaultMessage="City"
                                                                    />
                                                                </label>
                                                                <input
                                                                    name="City"
                                                                    type="text"
                                                                    className="form-control AddAddressModal"
                                                                    id="inputCity"
                                                                    placeholder={city}
                                                                    onChange={formik.handleChange}
                                                                    value={formik.values.City}
                                                                />
                                                                {formik.errors.City && (
                                                                    <p style={{ color: 'red' }}>
                                                                        {formik.errors.City}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="inputZip">
                                                                    <FormattedMessage
                                                                        id="UserProfile_page.Zip"
                                                                        defaultMessage="Zip"
                                                                    />
                                                                </label>
                                                                <input
                                                                    name="Zip"
                                                                    type="text"
                                                                    className="form-control AddAddressModal"
                                                                    id="inputZip"
                                                                    placeholder={zip}
                                                                    onChange={formik.handleChange}
                                                                    value={formik.values.Zip}
                                                                />
                                                                {formik.errors.Zip && (
                                                                    <p style={{ color: 'red' }}>
                                                                        {formik.errors.Zip}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <label htmlFor="inputState">
                                                                    <FormattedMessage
                                                                        id="UserProfile_page.Address Type"
                                                                        defaultMessage="Address Type"
                                                                    />
                                                                </label>
                                                                <select
                                                                    name="AddressType"
                                                                    id="inputState"
                                                                    className="form-control"
                                                                    onChange={formik.handleChange}
                                                                    value={
                                                                        formik.values.AddressType
                                                                    }
                                                                >
                                                                    <option
                                                                        selected="{true}"
                                                                        className="selectoption"
                                                                    >
                                                                        <FormattedMessage
                                                                            id="UserProfile_page.Select Address Type"
                                                                            defaultMessage="Select Address Type"
                                                                        />
                                                                    </option>
                                                                    <option value="1">
                                                                        <FormattedMessage
                                                                            id="UserProfile_page.Home"
                                                                            defaultMessage="Home"
                                                                        />
                                                                    </option>
                                                                    <option value="2">
                                                                        <FormattedMessage
                                                                            id="UserProfile_page.Work"
                                                                            defaultMessage="Work"
                                                                        />
                                                                    </option>
                                                                    <option value="3">
                                                                        <FormattedMessage
                                                                            id="UserProfile_page.Other"
                                                                            defaultMessage="Other"
                                                                        />
                                                                    </option>
                                                                </select>
                                                                {formik.errors.AddressType && (
                                                                    <p style={{ color: 'red' }}>
                                                                        {formik.errors.AddressType}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <button
                                                            type="submit"
                                                            className="btn btn-danger AddAddressModal"
                                                            data-dismiss="modal"
                                                            aria-label="Close"
                                                        >
                                                            <FormattedMessage
                                                                id="UserProfile_page.Add Address"
                                                                defaultMessage="Add Address"
                                                            />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer ModalHomeFooterProfile" />
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default injectIntl(Address);
