import './App.css';
import { Routes, Route } from 'react-router-dom';

// Page Components
import Form from './components/Form.js';
import SignInPage from './components/UserLoginPage.js';
import Dashboard from './components/Dashboard.js';
import UserHomePage from './components/userHomePage.js';
import UserStatus from './components/UserStatus.js';


// Guard Components
import UserRoute from './components/UserRoute.js';
import AdminRoute from './components/AdminRoute.js';

function App() {
  return (
    <Routes>

      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/" element={<SignInPage />} />

      <Route element={<UserRoute />}>
        <Route path="/user/homepage" element={<UserHomePage />} />
        <Route path="/user/status" element={<UserStatus />} />
        <Route path="/user/form" element={<Form />} />

      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />

      </Route>

    </Routes>
  );
}

export default App;

