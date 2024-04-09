import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer.jsx';
import Header from '../components/Header.jsx';
import RegistrationForm from '../features/auth/components/RegistrationForm.jsx';
import Paper from '../components/Paper.jsx';

// eslint-disable-next-line import/no-unresolved
import backgroundImage from '/background.jpg';

function LandingPage() {
  const loading = useSelector((state) => state.registration.loading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <PageContainer loading={loading}>
      <Header className={'h-[60px]'} />
      <div
        className="grow bg-white bg-cover bg-fixed bg-[left_55%_top_20%]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="flex flex-row">
          <div className="flex flex-1 items-end justify-center"></div>
          <div className="flex flex-1 items-center justify-center">
            <Paper className="bt-0 max-w-[500px] rounded-t-none">
              <RegistrationForm />
            </Paper>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default LandingPage;
