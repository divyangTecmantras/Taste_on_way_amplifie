import React, { useState, useEffect } from 'react';
import { decrementQuantity, incrementQuantity } from '../../../redux/actions/cart/cart';
import { transferDataAddToCart, getItem, setItem } from '../../../utils/utils';
import { fetchAddToCart } from '../../../redux/actions/cart/AddToCart';
import { fetchCreateOrder } from '../../../redux/actions/order/createOrder';
import { fetchCreateOrderTransaction } from '../../../redux/actions/order/createOrderTransaction';
import { fetchGetPromoCodeData } from '../../../redux/actions/promoCode/getPromoCode';
import { fetchApplyPromoCode } from '../../../redux/actions/promoCode/applyPromoCode';
import { fetchRemovePromoCode } from '../../../redux/actions/promoCode/removePromoCode';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'react-bootstrap';
import image from '../../../assets/images/Tastes_on_way.png';
import veg from '../../../assets/images/veg.png';
import customize from '../../../assets/images/customize.png';
import rupee from '../../../assets/images/rupee.png';
import applyCoupon from '../../../assets/images/apply-coupon.png';
import offercodeicon from '../../../assets/images/offercodeicon.png';
import checkListIcon from '../../../assets/images/check-list-icon.png';
import './CartProductDetails.css';
import Toastify from '../../common/Toastify';
const CartProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [itemChecked, setItemChecked] = useState([]);
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState([]);
    const cartProducts = JSON.parse(getItem('cartData'));
    const cartDetails = JSON.parse(getItem('cartDetails'));
    const appliedPromoCode = JSON.parse(getItem('appliedCoupon'));
    const lat = getItem('lat');
    const long = getItem('long');
    const userAddress = JSON.parse(getItem('userAddress'));

    const defaultAddress =
        userAddress?.data?.length >= 0
            ? userAddress?.data?.filter((d) => d.is_delivery_address == 'Yes')
            : null;

    const { viewCartItems, cartItemId, createOrder, promoCodes, setAddress, userDetails } =
        useSelector((state) => ({
            viewCartItems: state?.viewCartItems?.payload?.data,
            cartItemId: state?.cartItems?.id,
            createOrder: state?.createOrder?.payload?.data,
            promoCodes: state?.promoCodes?.payload?.data,
            setAddresas: state?.userAddress?.data,
            userDetails: state?.userInfo?.payload?.data,
        }));

    useEffect(() => {
        dispatch(fetchGetPromoCodeData());
        if (createOrder) {
            switch ('razorpay') {
                case 'razorpay':
                    {
                        const options = {
                            key: 'rzp_test_E4EKGFVJAABMLb',
                            key_secret: '2zZeFCS9Mfe7zqGnHsmh4MIy',
                            amount: cartDetails?.data?.total * 100,
                            name: 'Taste on Way',
                            description: 'Test Transaction',
                            order_id: createOrder.Razorpay_order_id,
                            image: image,
                            handler: function (response) {
                                const apiData = {
                                    order_id: createOrder.order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature,
                                    message: 'this is test',
                                    status: '2',
                                    previous_razorpay_order_id: createOrder.Razorpay_order_id,
                                };
                                dispatch(fetchCreateOrderTransaction(apiData));
                                navigate('/orderDetails');
                            },
                            prefill: {
                                name: userDetails?.name,
                                email: userDetails?.email,
                                contact: userDetails?.mobile_number,
                            },
                            theme: {
                                color: '#3399cc',
                            },
                        };
                        const rzp = new window.Razorpay(options);
                        rzp.open();
                    }
                    break;

                default:
                    break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createOrder, setAddress]);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setItemChecked([]);
    };

    const incrementQuantityOnClick = (id) => {
        const data = cartProducts?.map((item) => {
            if (Number(item.id) === Number(id)) {
                const quantity = Number(item.quantity) + 1;
                return { ...item, quantity };
            }
            return item;
        });
        setItem('cartData', JSON.stringify(data));
        dispatch(incrementQuantity(data, cartItemId));

        const menuItems = transferDataAddToCart(data);

        const apiData = {
            lat: lat,
            long: long,
            redious: '5',
            menu_items: menuItems,
        };
        dispatch(fetchAddToCart(apiData));
    };

    const decrementQuantityOnClick = (id) => {
        const data = cartProducts?.map((item) => {
            if (Number(item.id) === Number(id)) {
                const quantity = Number(item.quantity) - 1;
                if (quantity === 0) {
                    const newId = cartItemId.indexOf(id);
                    if (newId > -1) {
                        cartItemId.splice(newId, 1);
                        dispatch(decrementQuantity(item, cartItemId));
                    }
                }
                return { ...item, quantity };
            }
            return item;
        });

        const cartData = data.filter((id) => id.quantity > 0);
        setItem('cartData', JSON.stringify(cartData));
        dispatch(decrementQuantity(cartData, cartItemId));

        const menuItems = transferDataAddToCart(cartData);

        const apiData = {
            lat: lat,
            long: long,
            redious: '5',
            menu_items: menuItems,
        };
        dispatch(fetchAddToCart(apiData));
    };

    const proceedForPayment = (data) => {
        const newDate = new Date();
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        const time = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        const apiData = {
            business_owner_id: data?.item[0]?.business_owner.id,
            business_owner_address_id: data?.item[0]?.business_owner_address.id,
            user_address_id: defaultAddress?.[0]?.id,
            date_for_incoming_order: `${date}-${month}-${year}`,
            time_for_incoming_order: time,
        };
        if (defaultAddress.length == 0 || defaultAddress == null) {
            Toastify('Please Select Address', 'error');
        } else {
            dispatch(fetchCreateOrder(apiData));
        }
    };

    const applyPromoCode = (id, flag) => {
        const apiData = {
            promo_code_id: id,
            couponFlag: flag === 'coupon' ? 1 : 2,
        };
        dispatch(fetchApplyPromoCode(apiData));
    };

    const removePromoCode = () => {
        const apiData = {
            user_coupon_id: appliedPromoCode?.userCouponId
                ? appliedPromoCode.userCouponId
                : cartDetails.data.coupon_id,
        };
        dispatch(fetchRemovePromoCode(apiData));
    };

    const handleChangeCheckBox = (e, ing, data) => {
        const { value, checked } = e.target;
        if (checked) {
            setItemChecked([...itemChecked, ing]);
        } else {
            if (itemChecked.length > 0) {
                const filterData = itemChecked.filter((id) => id.id != value);
                setItemChecked(filterData);
            } else {
                const fd = data.filter((x) => Number(x.id) != Number(value));
                setItemChecked([...fd]);
            }
        }
    };

    const addItemClick = (id) => {
        if (cartProducts?.length > 0) {
            const data = cartProducts?.map((item) => {
                if (item.id === id) {
                    const itemAmount = itemChecked.map((d) => {
                        return d.price;
                    });
                    const amount =
                        itemAmount.length > 0
                            ? item.amount +
                              itemAmount?.reduce((sum, acum) => {
                                  return sum + acum;
                              }, 0)
                            : item.amount;
                    return { ...item, extraItem: itemChecked, finalAmount: amount };
                }
                return item;
            });
            setItemChecked([]);
            setItem('cartData', JSON.stringify(data));
            setShow(false);
            const menuItems = transferDataAddToCart(data);
            const apiData = {
                lat: lat,
                long: long,
                redious: '5',
                menu_items: menuItems,
            };
            dispatch(fetchAddToCart(apiData));
        }
    };
    return (
        <div className="col-lg-4">
            <div className="row PaymentBar RespmargTop">
                <div className="col-sm-12">
                    <div className="text-center">
                        <h2>
                            {
                                cartDetails?.data?.cart?.[0]?.item?.[0]?.business_owner_address
                                    ?.office_name
                            }
                        </h2>
                    </div>
                    {cartDetails?.data?.cart.length > 0 ? (
                        <>
                            <div className="cartItems">
                                {cartDetails &&
                                    cartDetails?.data?.cart.map((data) => {
                                        return (
                                            <div key={data.id} className="">
                                                <hr />
                                                <div className="row">
                                                    <div className="col">
                                                        <img
                                                            src={data?.item?.[0]?.picture}
                                                            alt="deliciousdosapay"
                                                            style={{
                                                                width: '109px',
                                                                height: '109px',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <div className="DeliciousDosaFont">
                                                            {data?.name}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row VegImgRow mt-4">
                                                    <div className="col-lg-1">
                                                        <img src={veg} alt="" />
                                                    </div>
                                                    <div className="col-lg-4 TextColor">
                                                        {cartProducts?.map((ing) => {
                                                            if (
                                                                Number(ing.id) === Number(data.id)
                                                            ) {
                                                                const length = ing?.item_ingridient;
                                                                if (length?.length > 0) {
                                                                    return (
                                                                        <div key={Number(data.id)}>
                                                                            <button
                                                                                className="mb-4 bg-transparent border-0"
                                                                                onClick={() => {
                                                                                    // eslint-disable-next-line no-debugger
                                                                                    if (
                                                                                        ing
                                                                                            ?.extraItem
                                                                                            ?.length >
                                                                                        0
                                                                                    ) {
                                                                                        setItemChecked(
                                                                                            ing.extraItem,
                                                                                        );
                                                                                    } else {
                                                                                        setItemChecked(
                                                                                            [],
                                                                                        );
                                                                                    }
                                                                                    setModal(ing);
                                                                                    handleShow();
                                                                                }}
                                                                            >
                                                                                <span className="TextSmall ">
                                                                                    <FormattedMessage
                                                                                        id="RestaurentDetails.Customize"
                                                                                        defaultMessage="Customize"
                                                                                    />{' '}
                                                                                </span>
                                                                                <img
                                                                                    src={customize}
                                                                                    alt="customize"
                                                                                    width="6px"
                                                                                />
                                                                            </button>
                                                                            <div
                                                                                className="modal fade"
                                                                                id="exampleModaltoping"
                                                                                tabIndex={-1}
                                                                                aria-labelledby="exampleModalLabel"
                                                                                aria-hidden="true"
                                                                            >
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h4
                                                                                                className="modal-title"
                                                                                                id="exampleModalLabel"
                                                                                            >
                                                                                                <FormattedMessage
                                                                                                    id="RestaurentDetails.Select Topings"
                                                                                                    defaultMessage="Select Topings"
                                                                                                />
                                                                                            </h4>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="close"
                                                                                                data-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                            >
                                                                                                <span aria-hidden="true">
                                                                                                    ×
                                                                                                </span>
                                                                                            </button>
                                                                                        </div>
                                                                                        <div className="modal-body text-left">
                                                                                            <div
                                                                                                className="card mb-3"
                                                                                                style={{
                                                                                                    maxWidth: 540,
                                                                                                }}
                                                                                            >
                                                                                                <div className="row no-gutters">
                                                                                                    <div className="col-md-4">
                                                                                                        <img
                                                                                                            src={
                                                                                                                ing.picture
                                                                                                            }
                                                                                                            alt="Topings"
                                                                                                            className="ImgWidthToping"
                                                                                                            style={{
                                                                                                                width: '128px',
                                                                                                                height: '126px',
                                                                                                                objectFit:
                                                                                                                    'cover',
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="col-md-8">
                                                                                                        <div className="card-body">
                                                                                                            <h5 className="card-title TitleResp">
                                                                                                                {
                                                                                                                    data.name
                                                                                                                }
                                                                                                            </h5>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div
                                                                                                className="card mb-3"
                                                                                                style={{
                                                                                                    maxWidth: 540,
                                                                                                }}
                                                                                            >
                                                                                                <div className="row no-gutters">
                                                                                                    <div className="col-md-12">
                                                                                                        <div className="ToppingSelect">
                                                                                                            <span className="SelectTopingsHead">
                                                                                                                <FormattedMessage
                                                                                                                    id="RestaurentDetails.Select Topings:"
                                                                                                                    defaultMessage="Select Topings:"
                                                                                                                />
                                                                                                            </span>
                                                                                                            {length.map(
                                                                                                                (
                                                                                                                    ing,
                                                                                                                ) => {
                                                                                                                    return (
                                                                                                                        <div
                                                                                                                            className="CheckboxTopings"
                                                                                                                            key={
                                                                                                                                ing.id
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <input
                                                                                                                                type="checkbox"
                                                                                                                                name=""
                                                                                                                                className="CheckToping"
                                                                                                                                value={
                                                                                                                                    ing.id
                                                                                                                                }
                                                                                                                            />{' '}
                                                                                                                            <span>
                                                                                                                                {
                                                                                                                                    ing.name
                                                                                                                                }
                                                                                                                            </span>
                                                                                                                            <span className="FloatRightTopings">
                                                                                                                                <img
                                                                                                                                    src={
                                                                                                                                        rupee
                                                                                                                                    }
                                                                                                                                    alt=""
                                                                                                                                    className="RupeeImg"
                                                                                                                                />{' '}
                                                                                                                                {
                                                                                                                                    ing.price
                                                                                                                                }
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    );
                                                                                                                },
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="modal-footer ModalHomeFooterProfile">
                                                                                            <div className="floatRightButton">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-danger btnradius"
                                                                                                    data-dismiss="modal"
                                                                                                >
                                                                                                    <FormattedMessage
                                                                                                        id="RestaurentDetails.Add Item"
                                                                                                        defaultMessage="Add Item"
                                                                                                    />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                } else {
                                                                    return <></>;
                                                                }
                                                            }
                                                        })}
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="CardShadowCheckout">
                                                            <div className="CardBoxShadowCheckout">
                                                                <button
                                                                    type="button"
                                                                    className="btn btnCard"
                                                                    onClick={() =>
                                                                        decrementQuantityOnClick(
                                                                            data.id,
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </button>
                                                                <span>{data?.quantity}</span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btnCard"
                                                                    onClick={() =>
                                                                        incrementQuantityOnClick(
                                                                            data.id,
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 ml-3 TextRight">
                                                        <img
                                                            src={rupee}
                                                            alt=""
                                                            className="RupeeImg"
                                                        />
                                                        <span className="TextColor">
                                                            {data?.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="row mt-5">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {appliedPromoCode ||
                                            cartDetails?.data?.couponValue > 0 ? (
                                                <div
                                                    style={{ border: '1px solid #ddd' }}
                                                    className="ApplyCouponDiv"
                                                >
                                                    <button
                                                        className="bg-transparent border-0  btncolor"
                                                        onClick={() => removePromoCode()}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{ border: '1px solid #ddd' }}
                                                    className="ApplyCouponDiv"
                                                >
                                                    <button
                                                        className="bg-transparent border-0 btncolor"
                                                        data-toggle="modal"
                                                        data-target="#exampleModalpromocode"
                                                    >
                                                        <img
                                                            src={applyCoupon}
                                                            alt=""
                                                            className="ApplyCouponCode"
                                                        />
                                                        <FormattedMessage
                                                            id="Cart_page.Apply Coupon"
                                                            defaultMessage="Apply Coupon"
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className="modal fade"
                                            id="exampleModalpromocode"
                                            tabIndex={-1}
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4
                                                            className="modal-title"
                                                            id="exampleModalLabel"
                                                        >
                                                            <FormattedMessage
                                                                id="Cart_page.Promo Codes"
                                                                defaultMessage="Promo Codes"
                                                            />{' '}
                                                        </h4>
                                                        <button
                                                            type="button"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            aria-label="Close"
                                                        >
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    {promoCodes?.length > 0 ? (
                                                        <div className="modal-body text-left">
                                                            {promoCodes?.map((data) => {
                                                                return (
                                                                    <div
                                                                        className="card mb-4 mt-2"
                                                                        style={{ maxWidth: 540 }}
                                                                        key={data.id}
                                                                    >
                                                                        <div className="row no-gutters">
                                                                            <div className="col-md-2">
                                                                                <img
                                                                                    src={
                                                                                        offercodeicon
                                                                                    }
                                                                                    alt="offercode"
                                                                                    className="ImgWidthPromocode"
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-10">
                                                                                <div className="card-body">
                                                                                    <h5 className="card-title PromoCardTitle TitleResp">
                                                                                        {`${data.name} ${data.coupon_value} ${data.type}`}
                                                                                        <button
                                                                                            className="ApplyCode ApplycodeResp bg-transparent border-0"
                                                                                            data-dismiss="modal"
                                                                                            aria-label="Close"
                                                                                            onClick={() =>
                                                                                                applyPromoCode(
                                                                                                    data.id,
                                                                                                    data.flag,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            APPLY
                                                                                        </button>
                                                                                    </h5>

                                                                                    <small className="text-muted ViewmoretextPromo">
                                                                                        Use Code
                                                                                    </small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <hr className="RowWithDivider" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-12 ListCoupon">
                                                                                <div className="mt-1">
                                                                                    <span className="ListCouponImg">
                                                                                        <img
                                                                                            src={
                                                                                                checkListIcon
                                                                                            }
                                                                                            className="ListCouponImg"
                                                                                            alt=""
                                                                                        />
                                                                                        Valid on
                                                                                        orders above{' '}
                                                                                        <img
                                                                                            src={
                                                                                                rupee
                                                                                            }
                                                                                            className="RupeeImg"
                                                                                            alt=""
                                                                                        />
                                                                                        {
                                                                                            data.minimum_order_value
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                <div className="mt-1">
                                                                                    <span className="ListCouponImg">
                                                                                        <img
                                                                                            src={
                                                                                                checkListIcon
                                                                                            }
                                                                                            className="ListCouponImg"
                                                                                            alt=""
                                                                                        />
                                                                                        {`You can use
                                                                                        this
                                                                                        promocode
                                                                                        ${data.valid_per_user}
                                                                                        times`}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="mt-1">
                                                                                    <span className="ListCouponImg">
                                                                                        <img
                                                                                            src={
                                                                                                checkListIcon
                                                                                            }
                                                                                            className="ListCouponImg"
                                                                                            alt=""
                                                                                        />
                                                                                        {`It is
                                                                                        Applicable
                                                                                        to maximum
                                                                                        ${data.total_no_user} users`}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="mb-4 mt-1">
                                                                                    <span className="ListCouponImg">
                                                                                        <img
                                                                                            src={
                                                                                                checkListIcon
                                                                                            }
                                                                                            className="ListCouponImg"
                                                                                            alt=""
                                                                                        />
                                                                                        {`Valid from
                                                                                        ${data.start_date}
                                                                                        to
                                                                                        ${data.valid_till_date}`}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <div className="modal-body text-left">
                                                            No PromoCode Available
                                                        </div>
                                                    )}

                                                    <div className="modal-footer ModalHomeFooterPromo"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="DeliciousDosaFont">Order Summary</div>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <div className="TextColor">
                                                Items ({cartDetails?.data?.cart?.length}) :
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="Rupeeiconpay TextColor">
                                                <img src={rupee} alt="" className="RupeeImg" />
                                                {cartDetails?.data?.cartTotal}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <div className="TextColor">Delivery Fee</div>
                                        </div>
                                        <div className="col">
                                            <div className="Rupeeiconpay TextColor">
                                                <img src={rupee} alt="" className="RupeeImg" />
                                                {cartDetails?.data?.deliveryCharge}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        {cartDetails?.data?.couponValue > 0 ? (
                                            <>
                                                {' '}
                                                <div className="col">
                                                    <div className="TextColor">
                                                        Discount Value :
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="Rupeeiconpay TextColor">
                                                        <img
                                                            src={rupee}
                                                            alt=""
                                                            className="RupeeImg"
                                                        />
                                                        {cartDetails?.data?.couponValue}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col">
                                            <div className="TextColor">Tax Collected :</div>
                                        </div>
                                        <div className="col">
                                            <div className="Rupeeiconpay TextColor">
                                                <img src={rupee} alt="" className="RupeeImg" />
                                                {cartDetails?.data?.taxAmount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col">
                                    <div className="row mt-2">
                                        <div className="col">
                                            <div className="TextColor">
                                                <b>To Pay</b>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="Rupeeiconpay TextColor">
                                                <img src={rupee} alt="" className="RupeeImg" />
                                                <b>{cartDetails?.data?.total}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-danger respmargleft"
                                            data-dismiss="modal"
                                            onClick={() =>
                                                navigate(
                                                    `/kitchenOwnerDetails/${viewCartItems?.cart[0]?.item[0]?.business_owner?.id}`,
                                                )
                                            }
                                        >
                                            <FormattedMessage
                                                id="Cart_page.Add More Items"
                                                defaultMessage="Add More Items"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-dismiss="modal"
                                            onClick={() =>
                                                proceedForPayment(viewCartItems?.cart[0])
                                            }
                                        >
                                            <FormattedMessage
                                                id="Cart_page.Proceed for payment"
                                                defaultMessage="Proceed for payment"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="TextColor">
                            <h1>Cart is empty</h1>
                            <p className=" mt-3 mb-5">
                                Please go to
                                <button
                                    type="button"
                                    className="btn btn-primary bg-transparent border-0 text-primary"
                                    onClick={() => navigate('/landingPage')}
                                >
                                    Kitchen Owner
                                </button>
                                page
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Modal show={show} onHide={handleShow}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Select Topings</h4>
                        <button type="button" className="close" onClick={handleClose}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body text-left">
                        <div
                            className="card mb-3"
                            style={{
                                maxWidth: 540,
                            }}
                        >
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img
                                        src={modal.picture}
                                        alt="Topings"
                                        className="ImgWidthToping"
                                        style={{
                                            width: '128px',
                                            height: '126px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title TitleResp">{modal.name}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="card mb-3"
                            style={{
                                maxWidth: 540,
                            }}
                        >
                            <div className="row no-gutters">
                                <div className="col-md-12">
                                    <div className="ToppingSelect">
                                        <span className="SelectTopingsHead">Select Topings:</span>
                                        {modal?.item_ingridient?.map((ing) => {
                                            const checked = cartProducts?.find(
                                                (x) => Number(x.id) === Number(modal.id),
                                            );
                                            const ck = checked?.extraItem?.map((v) => {
                                                return v.id;
                                            });
                                            return (
                                                <div className="CheckboxTopings" key={ing.id}>
                                                    <input
                                                        type="checkbox"
                                                        name=""
                                                        defaultChecked={ck?.includes(ing.id)}
                                                        className="CheckToping"
                                                        value={ing.id}
                                                        onChange={(e) =>
                                                            handleChangeCheckBox(
                                                                e,
                                                                ing,
                                                                ing.extraItem,
                                                            )
                                                        }
                                                    />{' '}
                                                    <span>{ing.name}</span>
                                                    <span className="FloatRightTopings">
                                                        <img
                                                            src={rupee}
                                                            alt=""
                                                            className="RupeeImg"
                                                        />{' '}
                                                        {ing.price}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer ModalHomeFooterProfile">
                        <div className="floatRightButton">
                            <button
                                type="button"
                                className="btn btn-danger btnradius"
                                data-dismiss="modal"
                                onClick={() => addItemClick(modal.id)}
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="row PaymentBar mt-5 mb-5">
                {defaultAddress?.length > 0 ? (
                    <>
                        {userAddress?.data?.map((d) => {
                            if (d.is_delivery_address == 'Yes') {
                                return (
                                    <div className="col " key={d.id}>
                                        <div className="DeliciousDosaFontNew">Deliver to:</div>
                                        <div className="TextColor mt-3">
                                            {d?.address} {','}
                                            {d?.area} {','}
                                            {d?.land_mark}
                                            {','}
                                            {d?.city?.name} {','}
                                            {d?.pin_code}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </>
                ) : userAddress?.data?.length == 0 ? (
                    <div className="col">{`Please Add Address for delivery`}</div>
                ) : (
                    <div className="col">{`Please select Address for delivery`}</div>
                )}
            </div>

            <div className="row PaymentBar mt-5 mb-5">
                <div className="col ">
                    <div className="DeliciousDosaFontNew">
                        Review your order and address details to avoid cancellations
                    </div>
                    <div className="TextColor mt-3">
                        <span className="DeliciousDosaFontNew">Note :</span> If you cancel within 60
                        seconds of placing your order, a 100% refund will be issued. No refund for
                        cancellations made after 60 seconds.
                    </div>

                    <div className="DeliciousDosaFontNew mt-3">
                        Avoid cancellation as it leads to food wastage.
                    </div>

                    <div className="DeliciousDosaFontNew RedColorFont mt-3">
                        Read cancellation policy
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductDetails;
