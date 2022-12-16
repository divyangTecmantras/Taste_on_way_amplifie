import React, { useState, useEffect } from 'react';
import { updateUserProfile } from '../../../redux/actions/user/updateUserInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
    ERROR_TOASTIFY_TYPE,
    PROFILE_PHOTO_ERROR,
    PROFILE_PHOTO_SUCCESS,
    SUCCESS_TOASTIFY_TYPE,
} from '../../../utils/enum';
import { FormattedMessage } from 'react-intl';
import Toastify from '../../common/Toastify';
import addimage from '../../../assets/images/addimg.png';
import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const [profileImg, setProfileImg] = useState();

    const { userInfo } = useSelector((state) => ({
        userInfo: state?.userInfo?.payload?.data,
    }));

    const { updateUserProfilePhotoSuccess, updateUserProfilePhotoError } = useSelector((state) => ({
        updateUserProfilePhotoSuccess: state?.updateUserProfile?.payload?.data,
        updateUserProfilePhotoError: state?.updateUserProfile?.error,
    }));

    useEffect(() => {
        if (updateUserProfilePhotoSuccess) {
            Toastify(PROFILE_PHOTO_SUCCESS, SUCCESS_TOASTIFY_TYPE);
        }
        if (updateUserProfilePhotoError) {
            Toastify(PROFILE_PHOTO_ERROR, ERROR_TOASTIFY_TYPE);
        }
    }, [updateUserProfilePhotoSuccess, updateUserProfilePhotoError]);

    const handleChange = (event) => {
        setProfileImg(event.target.files[0]);
    };

    const handleSubmit = () => {
        const form = new FormData();
        form.append('avatar', profileImg);

        dispatch(updateUserProfile(form));
    };

    return (
        <>
            <div className="container">
                <div className="row ProfileImgResp">
                    <div className="col-lg-12">
                        <img
                            style={{ height: '200px', width: '200px', borderRadius: '50%' }}
                            src={userInfo?.avatar}
                            className="RestProfileImg RestProfImgadd"
                            alt="Editprofile"
                        />

                        <button
                            style={{
                                background: 'red',
                                borderRadius: '50%',
                                border: 'none',
                                color: 'white',
                            }}
                            className="AddImg"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            id="profile_upload_link"
                            href="/Profile"
                        >
                            +
                            <img src={addimage} className="AddImg" alt="AddImg" />
                        </button>

                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            <FormattedMessage
                                                id="UserProfile_page.Update Profile Photo"
                                                defaultMessage="Update Profile Photo"
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
                                        <form>
                                            <div className="form-group">
                                                <input
                                                    onChange={handleChange}
                                                    type="file"
                                                    className="form-control-file"
                                                    id="exampleFormControlFile1"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer ModalHomeFooterProfile">
                                        <form className="floatRightButton">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger btnradius mx-2"
                                                data-dismiss="modal"
                                            >
                                                <FormattedMessage
                                                    id="UserProfile_page.Cancel"
                                                    defaultMessage="Cancel"
                                                />
                                            </button>

                                            <button
                                                onClick={handleSubmit}
                                                type="button"
                                                className="btn btn-danger btnradius"
                                                data-dismiss="modal"
                                            >
                                                <FormattedMessage
                                                    id="UserProfile_page.Update"
                                                    defaultMessage="Update"
                                                />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
