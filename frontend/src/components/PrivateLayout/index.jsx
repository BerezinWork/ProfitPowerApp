import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    return true;
};

const PrivateLayout = () => {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateLayout;