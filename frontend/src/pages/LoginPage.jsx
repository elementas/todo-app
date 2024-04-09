import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { check as checkAuth } from '../features/auth/authThunks';

import PageContainer from '../components/PageContainer.jsx';
import Logo from '../components/Logo.jsx';
import Paper from '../components/Paper.jsx';

import LoginForm from '../features/auth/components/LoginForm.jsx';

function LoginPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <PageContainer loading={loading}>
      <div className="flex grow items-center justify-center bg-neutral-100">
        <Paper className="w-fit">
          <Logo className="mx-auto mb-4" />
          <LoginForm />
        </Paper>
      </div>
    </PageContainer>
  );
}

export default LoginPage;
