import { Route, Routes } from 'react-router-dom'
import User from './pages/User';
import Home from './pages/home'


function App() {
  return (
    <Routes>
      <Route path='/users/*' element={<User />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
