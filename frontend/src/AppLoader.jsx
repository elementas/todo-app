import { Suspense } from 'react';

function SuspenseView() {
  return <div>LOADING</div>;
}

function AppLoader({ children }) {
  return <Suspense fallback={<SuspenseView />}>{children}</Suspense>;
}

export default AppLoader;
