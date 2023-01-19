import { combineReducers } from 'redux';
import countryDataReducer from './reducers/countryData/CountryDataReducer';
import registerUserReducer from './reducers/user/userRegisterReducer';
import loginUserReducer from './reducers/user/userLoginReducer';
import userOtpReducer from './reducers/user/UserOtpReducer';
import kitchenOwnerListReducer from './reducers/kitchenOwner/KitchenOwnerListReducer';
import kitchenOwnerMenuListReducer from './reducers/kitchenOwner/KitchenOwnerMenuListReducer';
import kitchenOwnerMenuItemListReducer from './reducers/kitchenOwner/KitchenOwnerMenuItemListReducer';
import kitchenOwnerDetailsReducer from './reducers/kitchenOwner/KitchenOwnerDetailsReducer';
import cartReducer from './reducers/cart/CartReducer';
import userInfoReducer from './reducers/user/userInfoReducer';
import userOrderHistoryReducer from './reducers/user/userOrderHistoryReducer';
import userAddressReducer from './reducers/user/userAddressReducer';
import customerSupportReducer from './reducers/user/customerSupportReducer';
import addUserAddressReducer from './reducers/user/addUserAddressReducer';
import deleteAddressReducer from './reducers/user/deleteAddressReducer';
import updateUserInfoReducer from './reducers/user/updateUserInfoReducer';
import viewCartReducer from './reducers/cart/ViewCartReducer';
import addToCartReducer from './reducers/cart/AddToCartReducer';
import createOrderReducer from './reducers/order/createOrderReducer';
import createOrderTransactionReducer from './reducers/order/createOrderTransactionReducer';
import createOrderDetailsReducer from './reducers/order/createOrderDetailsReducer';
import orderTrackingDetailsReducer from './reducers/order/orderTrackingDetailsReducer';
import getPromoCodeReducer from './reducers/promoCode/getPromoCodeReducer';
import applyPromoCodeReducer from './reducers/promoCode/applyPromoCodeReducer';
import removePromoCodeReducer from './reducers/promoCode/removePromoCodeReducer';
import cancelOrderReducer from './reducers/order/cancelOrderReducer';
import topFiveRestaurantsListReducer from './reducers/kitchenOwner/TopFiveRestaurantsListReducer';
import orderAgainListReducer from './reducers/kitchenOwner/OrderAgainListReducer';
import KitchenOwnerReviewReducer from './reducers/kitchenOwner/KitchenOwnerReviewReducer';
import setUserAddressReducer from './reducers/user/setUserAddressReducer';
import getReferralCodeReducer from './reducers/referralCode/getReferralCodeReducer';
import createReferralCodeReducer from './reducers/referralCode/createReferralCodeReducer';
const rootReducer = combineReducers({
    countryData: countryDataReducer,
    loginUser: loginUserReducer,
    registerUser: registerUserReducer,
    otpUser: userOtpReducer,
    kitchenOwnerList: kitchenOwnerListReducer,
    kitchenOwnerDetails: kitchenOwnerDetailsReducer,
    kitchenOwnerMenuList: kitchenOwnerMenuListReducer,
    kitchenOwnerMenuItemList: kitchenOwnerMenuItemListReducer,
    topFiveRestaurantsList: topFiveRestaurantsListReducer,
    orderAgainList: orderAgainListReducer,
    cartItems: cartReducer,
    userInfo: userInfoReducer,
    userOrderHistory: userOrderHistoryReducer,
    userAddress: userAddressReducer,
    customerSupport: customerSupportReducer,
    addUserAddress: addUserAddressReducer,
    deleteAddress: deleteAddressReducer,
    updateUserProfile: updateUserInfoReducer,
    viewCartItems: viewCartReducer,
    addToCart: addToCartReducer,
    createOrder: createOrderReducer,
    createOrderTransaction: createOrderTransactionReducer,
    orderDetails: createOrderDetailsReducer,
    orderTracking: orderTrackingDetailsReducer,
    promoCodes: getPromoCodeReducer,
    applyPromoCode: applyPromoCodeReducer,
    removePromoCode: removePromoCodeReducer,
    cancelOrder: cancelOrderReducer,
    kitchenOwnerReviewHistory: KitchenOwnerReviewReducer,
    setAddress: setUserAddressReducer,
    referralCode: getReferralCodeReducer,
    createReferralCode: createReferralCodeReducer,
});

export default rootReducer;
