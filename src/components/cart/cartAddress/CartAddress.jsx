import React, { useState } from 'react';
import * as yup from 'yup';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { addUserAddress } from '../../../redux/actions/user/addUserAddress';
import { getItem } from '../../../utils/utils';
import { useDispatch } from 'react-redux';
import home from '../../../assets/images/home.png';
import addNewAddress from '../../../assets/images/addnewaddress.png';
import { injectIntl } from 'react-intl';
import './CartAddress.css';
import { FormattedMessage } from 'react-intl';
import { fetchsetUserAddress } from '../../../redux/actions/user/setDeliveryAddress';
const CartAddress = ({ intl }) => {
    const zip = intl.formatMessage({ id: 'Place_holder.380015', defaultMessage: '380015' });
    const city = intl.formatMessage({ id: 'Place_holder.Ahmedabad', defaultMessage: 'Ahmedabad' });
    const area = intl.formatMessage({ id: 'Place_holder.shyamal', defaultMessage: 'shyamal' });
    const address = intl.formatMessage({
        id: 'Place_holder.1006, hospitality exacel',
        defaultMessage: '1006, hospitality exacel',
    });
    const lat = getItem('lat');
    const long = getItem('long');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const userAddress = JSON.parse(getItem('userAddress'));
    const handleShow = () => setShow(!show);

    const handelDeliverHere = (id) => {
        const apiData = {
            address_id: id,
        };
        dispatch(fetchsetUserAddress(apiData));
    };
    const formik = useFormik({
        initialValues: {
            Address: '',
            Area: '',
            Landmark: '',
            City: '',
            Zip: '',
            AddressType: '',
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
                latitude: lat,
                longitude: long,
            };
            dispatch(addUserAddress(apiData));
            resetForm();
            setShow(!show);
        },
    });
    return (
        <div className="col-lg-8">
            <div className="">
                <div className="DivDeliveryAddress">
                    <div className="DeliciousDosaFont">
                        <FormattedMessage
                            id="Cart_page.Choose a delivery address"
                            defaultMessage="Choose a delivery address"
                        />
                    </div>
                    {userAddress?.data?.length > 1 ? (
                        <div className="TextColor">
                            <FormattedMessage
                                id="Cart_page.Multiple addresses in this location"
                                defaultMessage="Multiple addresses in this location"
                            />
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="row">
                        {userAddress?.data?.length > 0 &&
                            userAddress?.data?.map((d) => {
                                return (
                                    <div className="col DivBoxAddress" key={d.id}>
                                        <img src={home} alt="homeIcon" />
                                        <span className="HomeAddress">
                                            <FormattedMessage
                                                id="Cart_page.Home"
                                                defaultMessage="Home"
                                            />
                                        </span>
                                        <p className="TextAdd AddTextWrap">
                                            {userAddress?.data
                                                ? `${d.address},${d.area},${d.land_mark},${d.pin_code}.`
                                                : ''}
                                        </p>
                                        {d.is_delivery_address == 'Yes' ? (
                                            <button
                                                type="button"
                                                className="btn btn-danger mt-5 BtnDeliverHere"
                                                data-dismiss="modal"
                                                disabled
                                            >
                                                Delivery Address
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn btn-danger mt-5 BtnDeliverHere"
                                                data-dismiss="modal"
                                                onClick={() => handelDeliverHere(d.id)}
                                            >
                                                <FormattedMessage
                                                    id="Cart_page.Deliver Here"
                                                    defaultMessage="Deliver Here"
                                                />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}

                        <div className="col DivBoxAddress">
                            <img src={addNewAddress} alt="addNewAddress" />
                            <span className="HomeAddress">
                                <FormattedMessage
                                    id="Cart_page.Add New Address"
                                    defaultMessage="Add New Address"
                                />
                            </span>
                            <p></p>
                            <button
                                type="button"
                                className="btn btn-danger BtnAddnewAdd"
                                onClick={() => handleShow()}
                            >
                                <FormattedMessage id="Cart_page.Add New" defaultMessage="Add New" />
                            </button>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleShow} animation={false}>
                        <div className="modal-content ContentLeft">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">
                                    <FormattedMessage
                                        id="Cart_page.Add New Address"
                                        defaultMessage="Add New Address"
                                    />
                                </h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span onClick={() => handleShow()} aria-hidden="true">
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
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.Address &&
                                                    formik.touched.Address && (
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
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.Area && formik.touched.Area && (
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
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.Landmark &&
                                                    formik.touched.Landmark && (
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
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.errors.City && formik.touched.City && (
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
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.errors.Zip && formik.touched.Zip && (
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
                                                        value={formik.values.AddressType}
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
                                                    {formik.errors.AddressType &&
                                                        formik.touched.AddressType && (
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
    );
};

export default injectIntl(CartAddress);
