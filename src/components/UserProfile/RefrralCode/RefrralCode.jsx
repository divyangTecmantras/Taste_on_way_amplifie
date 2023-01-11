import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateReferralCode } from '../../../redux/actions/referralCode/createReferralCode';
const RefrralCode = () => {
    const dispatch = useDispatch();
    const { refrralCode } = useSelector((state) => ({
        refrralCode: state?.referralCode?.payload?.data,
    }));
    console.log(
        '🚀 ~ file: RefrralCode.jsx:5 ~ const{refrralCode}=useSelector ~ refrralCode',
        refrralCode,
    );
    const handleShow = () => {
        dispatch(fetchCreateReferralCode());
    };
    return (
        <>
            {refrralCode === 'null' ? (
                <div className="sd ">
                    <button className="btn btn-danger" onClick={handleShow}>
                        Generate Refferal code
                    </button>
                </div>
            ) : (
                <div className="sd ">
                    <div>
                        {`Your Referral Code : `}
                        <b>{`${refrralCode?.code}`}</b>
                    </div>
                </div>
            )}
        </>
    );
};

export default RefrralCode;
