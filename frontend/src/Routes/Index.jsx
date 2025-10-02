import { Route } from 'react-router-dom';
import Landing from '../ui/pages/Landing';
import Register from '../ui/pages/Register';
import Login from '../ui/pages/login';
import Home from '../ui/pages/Home';
import Layout from '../ui/layouts/Layout';
import ProtectedRoute from './ProtectedRoute';

export const routes = [
  <Route key="landing" path="/" element={<Landing />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route key="login" path="/login" element={<Login />} />,

  <Route
  path="/app/*"
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
>
  <Route path="home" element={<Home />} />
</Route>
];
