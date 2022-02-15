import { Route, Routes } from 'react-router-dom'
import User from './pages/User';

function App() {
  return (
    <Routes>
      <Route path='/users/*' element={<User />} />
    </Routes>
  );
}

export default App;
