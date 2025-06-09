import { useRoutes } from 'react-router-dom';
import { routes } from './app/routes/routes';
import RootLayout from './app/Layout';
import { AuthProvider } from './app/features/auth/AuthContext';
import ErrorBoundary from './app/commonComponents/ErrorBoundary';
import { ToastContainer } from 'react-toastify';


function App() {
  const routeElements = useRoutes(
    routes.map((r) => ({ path: r.path, element: r.element }))
  );

  return(   
  <ErrorBoundary>
  <AuthProvider>
  <RootLayout>{routeElements}</RootLayout>
  <ToastContainer theme='dark' />
      </AuthProvider>
  </ErrorBoundary>
  )
}



export default App;
