
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ForgotPass from './Pages/ForgotPass';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/forgotPassword' element={<ForgotPass/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
