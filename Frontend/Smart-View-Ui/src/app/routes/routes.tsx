import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../Components/ProtectedRoute";
import UserDashboard from "../pages/UserDashboard";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import QuestionAttemptPage from "../pages/QuestionAttemptPage";



export interface AppRoute {
  id: string;
  path: string;
  element: React.ReactNode;
  displayName: string;
  auth?: boolean;
  isVisible?: boolean;
}

export const routes: AppRoute[] = [

  {
     id: 'home',
    path: '/',
    element: <HomePage />,
    displayName: 'Home',
    auth: false,
    isVisible: true,
  },

    {
    id: "dashboard",
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
    displayName: "Home",
    auth: true,
    isVisible: true,
  },
  {
    id: "question-attempt",
    path: "/question/:questionId",
    element: (
      <ProtectedRoute>
        <QuestionAttemptPage />
      </ProtectedRoute>
    ),
    displayName: "Question Attempt",
    auth: true,
    isVisible: false,
  },
  {
    id: "admin",
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    displayName: "Admin Dashboard",
    auth: true,
    isVisible: true,
  },

  {
    id: 'login',
    path: '/login',
    element: <LoginPage />,
    displayName: 'Login',
    auth: false,
    isVisible: true,
  },
  {
    id: 'register',
    path: '/register',
    element: <RegisterPage />,
    displayName: 'Register',
    auth: false,
    isVisible: true,
  },
  {
     id: 'confirmEmail',
    path: 'register/confirm-email',
    element: <ConfirmEmailPage />,
    displayName: 'ConfirmEmail',
    auth: false,
    isVisible: true,
  }
];
