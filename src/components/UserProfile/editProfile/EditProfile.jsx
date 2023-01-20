import React, { useState } from 'react';
import { updateUserProfile } from '../../../redux/actions/user/updateUserInfo';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import editprofile from '../../../assets/images/edit_profile.png';
import 'react-datepicker/dist/react-datepicker.css';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => ({
        userInfo: state?.userInfo?.payload?.data,
    }));

    const [show, setShow] = useState();

    const [dataEdtit, setDataEtit] = useState();

    const formik = useFormik({
        initialValues: {
            name: dataEdtit?.name,
            gender: dataEdtit?.gender
                ? dataEdtit?.gender === 'Male'
                    ? '1'
                    : dataEdtit?.gender === 'Female'
                    ? '2'
                    : ''
                : '',
            Birthdate: dataEdtit?.date_of_birth,
        },

        validationSchema: yup.object({
            name: yup.string().required('Enter Name'),
            Birthdate: yup.string().required('Enter Birthdate'),
        }),

        onSubmit: (values) => {
            const ProfileData = {
                name: values.name,
                gender: values.gender,
                date_of_birth: values.Birthdate,
            };

            dispatch(updateUserProfile(ProfileData));
            setShow(!show);
        },
        enableReinitialize: true,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(!show);

    return (
        <>
            <div className="row">
                <div className="col-lg-2 col-md-4 NameProfile">
                    <div>{userInfo?.name}</div>
                </div>

                <div className="col-lg-10 ">
                    <div className="TextCenterEditProfresp">
                        <Button
                            onClick={() => {
                                setDataEtit(userInfo);
                                handleShow(show);
                            }}
                            variant="none"
                            className="btn text-center BtnProfile "
                            data-toggle="modal"
                            data-target="#exampleModaledit"
                        >
                            <img src={editprofile} className="ImgProfile" alt="editprofile" />{' '}
                            <FormattedMessage
                                id="UserProfile_page.Edit Profile"
                                defaultMessage="Edit Profile"
                            />
                        </Button>
                    </div>

                    <div>
                        <Modal show={show} onHide={handleShow}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">
                                        <FormattedMessage
                                            id="UserProfile_page.Edit Profile"
                                            defaultMessage="Edit Profile"
                                        />
                                    </h4>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span onClick={handleClose} aria-hidden="true">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form className="mt-2">
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="inputEmail4" className="Labelmodel">
                                                    <FormattedMessage
                                                        id="UserProfile_page.Name"
                                                        defaultMessage="Name"
                                                    />
                                                </label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.name}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.name && (
                                                    <p style={{ color: 'red' }}>
                                                        {formik.errors.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12 bm-1">
                                                <label htmlFor="inputEmail4" className="Labelmodel">
                                                    <FormattedMessage
                                                        id="UserProfile_page.Gender"
                                                        defaultMessage="Gender"
                                                    />
                                                </label>
                                            </div>
                                            <>
                                                <div
                                                    value={formik.values.gender}
                                                    className="form-row ml-1 EditFormCheckbox"
                                                >
                                                    <div className="form-check form-check-inline form-check Checkedinput">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="inlineRadio1"
                                                            value="1"
                                                            onChange={formik.handleChange}
                                                            defaultChecked={
                                                                dataEdtit?.gender === '1'
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="inlineRadio1"
                                                        >
                                                            <FormattedMessage
                                                                id="UserProfile_page.Male"
                                                                defaultMessage="Male"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="inlineRadio2"
                                                            value="2"
                                                            onChange={formik.handleChange}
                                                            defaultChecked={
                                                                dataEdtit?.gender === '2'
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="inlineRadio2"
                                                        >
                                                            <FormattedMessage
                                                                id="UserProfile_page.Female"
                                                                defaultMessage="Female"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                            <div className="form-row"></div>
                                        </div>
                                        <div className="form-row mt-4">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="inputEmail4" className="Labelmodel">
                                                    <FormattedMessage
                                                        id="UserProfile_page.Birth Date"
                                                        defaultMessage="Birth Date"
                                                    />
                                                </label>

                                                <div
                                                    className="md-form md-outline input-with-post-icon datepicker"
                                                    id="customDays"
                                                >
                                                    <input
                                                        type="date"
                                                        name="Birthdate"
                                                        className="form-control"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.Birthdate}
                                                        defaultValue={dataEdtit?.Birthdate}
                                                    />
                                                    {formik.errors.Birthdate && (
                                                        <p style={{ color: 'red' }}>
                                                            {formik.errors.Birthdate}
                                                        </p>
                                                    )}
                                                </div>
                                                <div
                                                    className="md-form md-outline input-with-post-icon datepicker"
                                                    id="customDays"
                                                ></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer ModalHomeFooterProfile">
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        className="floatRightButton"
                                    >
                                        <button
                                            onClick={() => setShow(!show)}
                                            type="button"
                                            className="btn btn-outline-danger btnradius mx-2"
                                        >
                                            <FormattedMessage
                                                id="UserProfile_page.Cancel"
                                                defaultMessage="Cancel"
                                            />
                                        </button>

                                        <button type="submit" className="btn btn-danger btnradius">
                                            <FormattedMessage
                                                id="UserProfile_page.Update"
                                                defaultMessage="Update"
                                            />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
