import { useState } from 'react';
import { UserContext } from './context/userContext';
import { getLocalStorage } from './utils/localStorage';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  console.log('Hello world');
  const defaultUser = getLocalStorage('user')
    ? JSON.parse(getLocalStorage('user'))
    : null;
  const [user, setUser] = useState(defaultUser);
  return user ? (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  ) : (
    <Auth setUser={setUser} />
  );
}

export default App;
