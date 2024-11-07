import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './componetns/login/Login';
import Registration from './componetns/registration/Registration';
import Markview from './componetns/view/Markview';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/r' element={<Registration/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/marks' element={<Markview/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
