import React, { useEffect } from 'react';
import CartAddress from '../cartAddress/CartAddress';
import CartProductDetails from '../cartProductDetails/CartProductDetails';
import { fetchViewCart } from '../../../redux/actions/cart/ViewCart';
import { useDispatch, useSelector } from 'react-redux';
import './CartDetails.css';
import '../../../assets/styles/media.css';
import { fetchUserAddress } from '../../../redux/actions/user/userAddress';
import { getItem } from '../../../utils/utils';

const CartDetails = () => {
    const {
        addToCart,
        appliedPromoCode,
        removePromoCode,
        addUserAddressSuccess,
        setAddressSuccess,
    } = useSelector((state) => ({
        addToCart: state?.addToCart?.payload,
        appliedPromoCode: state?.applyPromoCode?.payload?.data,
        removePromoCode: state?.removePromoCode?.payload?.data,
        addUserAddressSuccess: state?.addUserAddress?.payload?.data,
        setAddressSuccess: state?.setAddress?.payload,
    }));

    const lat = getItem('lat');
    const long = getItem('long');
    const dispatch = useDispatch();
    useEffect(() => {
        const apiData = {
            lat: lat,
            long: long,
        };
        dispatch(fetchViewCart(apiData));
        dispatch(fetchUserAddress());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addToCart, appliedPromoCode, removePromoCode, addUserAddressSuccess, setAddressSuccess]);

    return (
        <div>
            <div className="ProceedtocheckoutBg"></div>
            <div className="container ProceedtocheckoutCont">
                <div className="row TopMargin">
                    <CartAddress />
                    <CartProductDetails />
                </div>
            </div>
        </div>
    );
};

export default CartDetails;
