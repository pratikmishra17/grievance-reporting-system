import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Navbar from './components/Navbar.js'
import Form from './components/Form.js'
import SignInPage from './components/Sign-in-page'

function App() {
  return (
    <>
    <BrowserRouter>
      {/* 
    <Form /> */}
      {/* <Navbar /> */}
       <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
