import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import PageContainer from './components/PageContainer.jsx';
import { check as authCheckThunk } from './features/auth/authThunks';

function PrivateRoute() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authChecked = useSelector((state) => state.auth.authChecked);
  const loading = useSelector((state) => state.auth.loading);
  const checkError = useSelector((state) => state.auth.checkError);

  if (!authChecked) {
    if (!loading && !checkError) {
      dispatch(authCheckThunk());
    }
    return <PageContainer loading={true}></PageContainer>;
  }

  if (isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to={`/login`} />;
}

export default PrivateRoute;
