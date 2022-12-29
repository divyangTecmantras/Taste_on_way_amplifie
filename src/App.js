import React from 'react';
import LandingPage from './components/landingPage/landingPage/LandingPage';
import Home from './components/homePage/Home';
import PrivateRouting from './components/privateRouting/PrivateRouting';
import PublicRoute from './components/privateRouting/PublicRoute';
import RestaurantDetails from './components/restaurentDetails/restaurantDetails/RestaurantDetails';
import KitchenOwnerDetails from './components/restaurentDetails/kitchenOwnerDetails/KitchenOwnerDetails';
import ErrorPage from './components/common/ErrorPage';
import CartDetails from './components/cart/cartDetails/CartDetails';
import UserProfile from '../src/components/UserProfile/userProfile/UserProfile';
import OrderDetails from './components/orderDetails/OrderDetails';
import { Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from './utils/utils';
import Footer from './components/common/Footer';
import UserProfileHeader from './components/UserProfile/userProfileHeader/UserProfileHeader';
import HomeHeader from './components/homePage/homeHeader/HomeHeader';
import { useEffect } from 'react';
import { fetchUserInfo } from './redux/actions/user/userInfo';
import AboutUs from './components/AboutUs/AboutUs';
import './assets/styles/media.css';

function App() {
    const { otpResponse } = useSelector((state) => ({
        otpResponse: state?.otpUser,
    }));
    const dispatch = useDispatch();
    const token = getItem('token');
    useEffect(() => {
        if (token) {
            dispatch(fetchUserInfo());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otpResponse]);

    return (
        <div className="App">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                transition={Slide}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {token ? <UserProfileHeader /> : <HomeHeader />}
            <Routes>
                <Route element={<PrivateRouting />}>
                    <Route path="/landingPage" element={<LandingPage />} />
                    <Route
                        path="/kitchenOwnerDetails/:KitchenOwnerId"
                        element={<RestaurantDetails />}
                    />
                    <Route
                        path="/kitchenOwnerDetails/:KitchenOwnerId/:MenuId"
                        element={<KitchenOwnerDetails />}
                    />
                    <Route path="/cartDetails" element={<CartDetails />} />
                    <Route path="/Profile" element={<UserProfile />} />
                    <Route path="/orderDetails" element={<OrderDetails />} />
                </Route>
                <Route path="/" element={<PublicRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
                <Route path="About-Us" element={<AboutUs />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
