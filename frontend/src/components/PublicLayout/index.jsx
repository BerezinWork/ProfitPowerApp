import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    return true;
};

const PublicLayout = () => {
    const isAuth = useAuth();

    return isAuth ? <Navigate to="/transactions" replace /> : <Outlet />;
};

export default PublicLayout;