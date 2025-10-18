import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Navbar from './components/Navbar.js'
import Form from './components/Form.js'
import SignInPage from './components/Sign-in-page'
import Dashboard from './components/Dashboard.js'

function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
        <Route path="/user/form" element={<Form />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
