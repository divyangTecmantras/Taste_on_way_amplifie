import React, { useEffect } from 'react';
import CartAddress from '../cartAddress/CartAddress';
import CartProductDetails from '../cartProductDetails/CartProductDetails';
import { fetchViewCart } from '../../../redux/actions/cart/ViewCart';
import { useDispatch, useSelector } from 'react-redux';
import './CartDetails.css';
import '../../../assets/styles/media.css';
import { fetchUserAddress } from '../../../redux/actions/user/userAddress';

const CartDetails = () => {
    const { addToCart, appliedPromoCode, removePromoCode, addUserAddressSuccess } = useSelector(
        (state) => ({
            addToCart: state?.addToCart?.payload,
            appliedPromoCode: state?.applyPromoCode?.payload?.data,
            removePromoCode: state?.removePromoCode?.payload?.data,
            addUserAddressSuccess: state?.addUserAddress?.payload?.data,
        }),
    );

    const dispatch = useDispatch();
    useEffect(() => {
        const apiData = {
            lat: '23.0690888',
            long: '72.6491766',
        };
        dispatch(fetchViewCart(apiData));
        dispatch(fetchUserAddress());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addToCart, appliedPromoCode, removePromoCode, addUserAddressSuccess]);

    return (
        <div>
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
