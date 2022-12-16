import React from 'react';
import { removeItem } from '../../../utils/utils';
import { userOtpClean } from '../../../redux/actions/user/userOtp';
import { userLoginClean } from '../../../redux/actions/user/userLogin';
import Toastify from '../../common/Toastify';
import { LOGOUT_SUCCESSFULL, SUCCESS_TOASTIFY_TYPE } from '../../../utils/enum';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import image from '../../../assets/images/Tastes_on_way.png';
import './UserProfileHeader.css';
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { useContext } from 'react';
import { Context } from '../../common/Wrapper';

const UserProfileHeader = () => {
    const context = useContext(Context);

    const { userInfo } = useSelector((state) => ({
        userInfo: state?.userInfo?.payload?.data,
    }));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        removeItem('token');
        dispatch(userOtpClean());
        dispatch(userLoginClean());
        navigate('/');
        Toastify(LOGOUT_SUCCESSFULL, SUCCESS_TOASTIFY_TYPE);
    };

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light NavHead NavbackWhite">
                <div className="container">
                    <a href="/" className="navbar-brand BrandLogo">
                        <img src={image} className="ImgWidthFix img-fluid" alt="img" />
                    </a>

                    <div>
                        <div className="btn-group">
                            <button className="btn-profile" onClick={() => navigate('/Profile')}>
                                <img
                                    style={{
                                        width: '51px',
                                        height: '51px',
                                        borderRadius: '50%',
                                    }}
                                    src={userInfo?.avatar}
                                    alt="avatar"
                                />
                            </button>
                            <button
                                type="button"
                                className="btn"
                                data-toggle="dropdown"
                                aria-expanded="false"
                                data-reference="parent"
                            >
                                <span className="Prtext">{userInfo?.name}</span>
                            </button>
                            <button
                                type="button"
                                className="btn BtnDropDown dropdown-toggle dropdown-toggle-split"
                                data-toggle="dropdown"
                                aria-expanded="false"
                                data-reference="parent"
                            />
                            <div className="dropdown-menu">
                                <button
                                    className="dropdown-item"
                                    onClick={() => navigate('/profile')}
                                >
                                    <CgProfile />{' '}
                                    <FormattedMessage
                                        id="UserProfile_page.Profile"
                                        defaultMessage="Profile"
                                    />
                                </button>

                                <button className="dropdown-item logout-btn" onClick={logOut}>
                                    <FiLogOut />{' '}
                                    <FormattedMessage
                                        id="UserProfile_page.Logout"
                                        defaultMessage="Logout"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <select
                    className="form-control col-md-1"
                    value={context.locale}
                    onChange={context.selectLang}
                >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="gj">ગુજરાતી</option>
                </select>
            </nav>
        </>
    );
};

export default UserProfileHeader;
