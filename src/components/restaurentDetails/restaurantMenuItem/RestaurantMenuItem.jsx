import React, { useState, useEffect } from 'react';
import { fetchKitchenOwnerMenuItemList } from '../../../redux/actions/kitchenOwner/KitchenOwnerMenuItemList';
import { addToCart, decrementQuantity, incrementQuantity } from '../../../redux/actions/cart/cart';
import { getItem, setItem, transferDataAddToCart } from '../../../utils/utils';
import { fetchAddToCart } from '../../../redux/actions/cart/AddToCart';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import previousSliderImg from '../../../assets/images/previous-slider.png';
import nextSliderImg from '../../../assets/images/next-slider.png';
import nextImg from '../../../assets/images/next.png';
import rupee from '../../../assets/images/rupee.png';
import customize from '../../../assets/images/customize.png';
import './RestaurantMenuItem.css';
const RestaurantMenuItem = () => {
    const { MenuId, KitchenOwnerId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(4);
    const [active, setActive] = useState(null);
    const [count, setCount] = useState(0);
    const [itemChecked, setItemChecked] = useState([]);

    const menuItems = JSON.parse(getItem('cartData'));
    const [show, setShow] = useState(false);

    const { kitchenOwnerMenuList, kitchenOwnerMenuItemList, cartItems, cartItemId } = useSelector(
        (state) => ({
            kitchenOwnerMenuList: state?.kitchenOwnerMenuList?.payload?.data?.data,
            kitchenOwnerMenuItemList: state?.kitchenOwnerMenuItemList?.payload?.data?.[0],
            cartItems: state?.cartItems?.payload,
            cartItemId: state?.cartItems?.id,
        }),
    );

    useEffect(() => {
        setActive(MenuId);
        const apiData = {
            business_owner_id: KitchenOwnerId,
            menu_id: MenuId,
        };
        dispatch(fetchKitchenOwnerMenuItemList(apiData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const nextOnClick = () => {
        setCount((prv) => prv + 4);
        setVisible((prv) => prv + 4);
    };

    const prviousOnClick = () => {
        setCount((prv) => prv - 4);
        setVisible((prv) => prv - 4);
    };

    const menuItemClick = (id) => {
        const apiData = {
            business_owner_id: KitchenOwnerId,
            menu_id: id,
        };
        setActive(id);
        dispatch(fetchKitchenOwnerMenuItemList(apiData));
    };

    const handleShow = () => setShow(!show);

    const onClickItemAdd = (data) => {
        if (menuItems?.length > 0) {
            const quantityData = { ...data, quantity: 1 };
            const apiData = [...menuItems, quantityData];
            const newData = apiData.filter(
                (d) =>
                    d.business_owner.kitchen_owner_cuisine[0].business_owner_id == KitchenOwnerId,
            );
            setItem('cartData', JSON.stringify(newData));
            dispatch(addToCart(apiData, [...cartItemId, data.id]));
        } else {
            const quantityData = { ...data, quantity: 1 };
            const apiData = [...cartItems, quantityData];
            const newData = apiData.filter(
                (d) =>
                    d.business_owner.kitchen_owner_cuisine[0].business_owner_id == KitchenOwnerId,
            );
            setItem('cartData', JSON.stringify(newData));
            dispatch(addToCart(apiData, [...cartItemId, data.id]));
        }
    };

    const incrementQuantityOnClick = (id) => {
        if (menuItems?.length > 0) {
            const data = menuItems?.map((item) => {
                if (item.id === id) {
                    const quantity = item.quantity + 1;
                    return { ...item, quantity };
                }
                return item;
            });
            setItem('cartData', JSON.stringify(data));
            dispatch(incrementQuantity(data, cartItemId));
        } else {
            const data = cartItems?.map((item) => {
                if (item.id === id) {
                    const quantity = item.quantity + 1;
                    return { ...item, quantity };
                }
                return item;
            });
            setItem('cartData', JSON.stringify(data));
            dispatch(incrementQuantity(data, cartItemId));
        }
    };

    const decrementQuantityOnClick = (id) => {
        if (menuItems?.length > 0) {
            const data = menuItems?.map((item) => {
                if (item.id === id) {
                    const quantity = item.quantity - 1;
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
        } else {
            const data = cartItems?.map((item) => {
                if (item.id === id) {
                    const quantity = item.quantity - 1;
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
        }
    };

    const checkOutPage = () => {
        if (menuItems?.length > 0) {
            const menuItem = transferDataAddToCart(menuItems);
            const apiData = {
                lat: '23.0130363',
                long: '72.5133087',
                redious: '5',
                menu_items: menuItem,
            };
            dispatch(fetchAddToCart(apiData));
            navigate('/cartDetails');
        } else {
            const menuItems = transferDataAddToCart(cartItems);
            const apiData = {
                lat: '23.0130363',
                long: '72.5133087',
                redious: '5',
                menu_items: menuItems,
            };
            setItem('cartData', JSON.stringify(cartItems));
            dispatch(fetchAddToCart(apiData));
            navigate('/cartDetails');
        }
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
                const fd = data.extraItem.filter((x) => Number(x.id) != Number(value));
                setItemChecked([...fd]);
            }
        }
    };

    const addItemClick = (id) => {
        if (menuItems?.length > 0) {
            const data = menuItems?.map((item) => {
                if (item.id === id) {
                    const itemAmount = itemChecked.map((d) => {
                        return d.price;
                    });
                    const amount = item.amount + itemAmount.reduce((sum, acum) => sum + acum, 0);
                    return { ...item, extraItem: itemChecked, finalAmount: amount };
                }
                return item;
            });
            setItemChecked([]);
            setItem('cartData', JSON.stringify(data));
            dispatch(addToCart(data, cartItemId));
            setShow(!show);
        } else {
            const data = cartItems?.map((item) => {
                if (item.id === id) {
                    const itemAmount = itemChecked.map((d) => {
                        return d.price;
                    });
                    const amount = item.amount + itemAmount.reduce((sum, acum) => sum + acum, 0);
                    return { ...item, extraItem: itemChecked, finalAmount: amount };
                }
                return item;
            });
            setItemChecked([]);
            setItem('cartData', JSON.stringify(data));
            dispatch(addToCart(data, cartItemId));
            setShow(!show);
        }
    };

    return (
        <div className="row TopMargin">
            <div className="col-lg-12">
                <div className="">
                    <h3>
                        <FormattedMessage
                            id="RestaurentDetails.Featured Items"
                            defaultMessage="Featured Items"
                        />
                    </h3>
                </div>
                <div className="DivClassControlsRestDetails">
                    <button
                        className={
                            visible <= 4 ? 'carousel-control-prev d-none' : 'carousel-control-prev'
                        }
                        type="button"
                        data-target="#carouselExampleInterval"
                        data-slide="prev"
                        onClick={prviousOnClick}
                    >
                        <img src={previousSliderImg} alt="" className="ImgCarouselWidth" />
                    </button>
                    <button
                        className={
                            visible >= kitchenOwnerMenuList?.length
                                ? 'carousel-control-next d-none'
                                : 'carousel-control-next '
                        }
                        type="button"
                        data-target="#carouselExampleInterval"
                        data-slide="next"
                        onClick={nextOnClick}
                    >
                        <img src={nextSliderImg} alt="" className="ImgCarouselWidth" />
                    </button>
                </div>

                <div className="row TopMargin">
                    <div className="col-lg-12">
                        <nav>
                            <div
                                className="nav nav-tabs nav-justified NavFontSizeTab"
                                id="nav-tab"
                                role="tablist"
                            >
                                {kitchenOwnerMenuList?.slice(count, visible).map((data) => {
                                    return (
                                        <button
                                            className={
                                                active == data.id ? 'nav-link active' : 'nav-link'
                                            }
                                            id="nav-home-tab"
                                            data-toggle="tab"
                                            data-target="#nav-home"
                                            type="button"
                                            role="tab"
                                            aria-controls="nav-home"
                                            aria-selected="true"
                                            key={data.id}
                                            onClick={() => menuItemClick(data.id)}
                                        >
                                            {data.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="nav-home"
                                role="tabpanel"
                                aria-labelledby="nav-home-tab"
                            >
                                {}
                                <div>
                                    {kitchenOwnerMenuItemList &&
                                        kitchenOwnerMenuItemList?.map((data) => {
                                            return (
                                                <div className="row TopMargin" key={data.id}>
                                                    <div className="col-lg-4">
                                                        <div
                                                            className="card CardCheckout"
                                                            style={{ width: '18rem' }}
                                                        >
                                                            <img
                                                                src={data.picture}
                                                                className="card-img-top"
                                                                alt="..."
                                                                style={{
                                                                    height: '15rem',
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                            <div className="CardShadow">
                                                                <div className="CardBoxShadow">
                                                                    {menuItems ? (
                                                                        <div>
                                                                            {menuItems?.filter(
                                                                                (x) =>
                                                                                    x.id ===
                                                                                    data.id,
                                                                            ).length > 0 ? (
                                                                                menuItems
                                                                                    ?.filter(
                                                                                        (x) =>
                                                                                            x.id ===
                                                                                            data.id,
                                                                                    )
                                                                                    ?.map((iv) => {
                                                                                        {
                                                                                            return (
                                                                                                <div
                                                                                                    key={
                                                                                                        iv.id
                                                                                                    }
                                                                                                >
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

                                                                                                    {menuItems.map(
                                                                                                        (
                                                                                                            v,
                                                                                                        ) => {
                                                                                                            if (
                                                                                                                v.id ===
                                                                                                                data.id
                                                                                                            ) {
                                                                                                                return (
                                                                                                                    <span
                                                                                                                        key={
                                                                                                                            v.id
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {
                                                                                                                            v.quantity
                                                                                                                        }
                                                                                                                    </span>
                                                                                                                );
                                                                                                            }
                                                                                                        },
                                                                                                    )}

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
                                                                                            );
                                                                                        }
                                                                                        // else if (
                                                                                        //     iv.id !=
                                                                                        //     data.id
                                                                                        // ) {
                                                                                        //     return (
                                                                                        //         <>
                                                                                        //             <button
                                                                                        //                 type="button"
                                                                                        //                 className="btn btnCard"
                                                                                        //                 onClick={() =>
                                                                                        //                     onClickItemAdd(
                                                                                        //                         data,
                                                                                        //                     )
                                                                                        //                 }
                                                                                        //             >
                                                                                        //                 Add
                                                                                        //             </button>
                                                                                        //         </>
                                                                                        //     );
                                                                                        // }
                                                                                    })
                                                                            ) : (
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btnCard"
                                                                                    onClick={() =>
                                                                                        onClickItemAdd(
                                                                                            data,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    Add
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btnCard"
                                                                            onClick={() =>
                                                                                onClickItemAdd(data)
                                                                            }
                                                                        >
                                                                            Add
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <span className="badge badge-danger">
                                                            <FormattedMessage
                                                                id="RestaurentDetails.Bestseller"
                                                                defaultMessage="Bestseller"
                                                            />
                                                        </span>
                                                        <div className="mt-4 DeliciousDosaFont">
                                                            {data.name}
                                                        </div>
                                                        <div className="mt-2 DeliciousDosaFont">
                                                            <img
                                                                src={rupee}
                                                                alt=""
                                                                className="RupeeImg"
                                                            />
                                                            {data.amount}
                                                        </div>
                                                        {menuItems
                                                            ?.map((y) => {
                                                                return y.id;
                                                            })
                                                            .includes(data.id) &&
                                                        data.item_ingridient.length > 0 ? (
                                                            <div>
                                                                {menuItems.map((v) => {
                                                                    if (
                                                                        Number(v.id) ===
                                                                        Number(data.id)
                                                                    ) {
                                                                        return (
                                                                            <button
                                                                                className="mb-4 bg-transparent border-0"
                                                                                key={v.id}
                                                                                onClick={() => {
                                                                                    if (
                                                                                        v?.extraItem
                                                                                            ?.length >
                                                                                        0
                                                                                    ) {
                                                                                        setItemChecked(
                                                                                            v.extraItem,
                                                                                        );
                                                                                    } else {
                                                                                        setItemChecked(
                                                                                            [],
                                                                                        );
                                                                                    }
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
                                                                        );
                                                                    }
                                                                })}
                                                            </div>
                                                        ) : (
                                                            ''
                                                        )}
                                                        <Modal show={show} onHide={handleShow}>
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
                                                                        onClick={handleShow}
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
                                                                                        data.picture
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
                                                                                        {data.name}
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
                                                                                    {data.item_ingridient.map(
                                                                                        (ing) => {
                                                                                            const checked =
                                                                                                menuItems?.find(
                                                                                                    (
                                                                                                        x,
                                                                                                    ) =>
                                                                                                        x.id ===
                                                                                                        data.id,
                                                                                                );
                                                                                            const ck =
                                                                                                checked?.extraItem?.map(
                                                                                                    (
                                                                                                        v,
                                                                                                    ) => {
                                                                                                        return v.id;
                                                                                                    },
                                                                                                );
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
                                                                                                        defaultChecked={ck?.includes(
                                                                                                            ing.id,
                                                                                                        )}
                                                                                                        value={
                                                                                                            ing.id
                                                                                                        }
                                                                                                        onChange={(
                                                                                                            e,
                                                                                                        ) =>
                                                                                                            handleChangeCheckBox(
                                                                                                                e,
                                                                                                                ing,
                                                                                                                checked,
                                                                                                            )
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
                                                                            onClick={() =>
                                                                                addItemClick(
                                                                                    data.id,
                                                                                )
                                                                            }
                                                                        >
                                                                            <FormattedMessage
                                                                                id="RestaurentDetails.Add Item"
                                                                                defaultMessage="Add Item"
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {menuItems?.length > 0 ? (
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <button
                            className="btn btn-danger BtnCheckOut"
                            onClick={() => checkOutPage()}
                        >
                            <FormattedMessage
                                id="RestaurentDetails.Checkout"
                                defaultMessage="Checkout"
                            />{' '}
                            <img src={nextImg} alt="next" width="18px" />
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default RestaurantMenuItem;
