import { useEffect, useState } from 'react';
import './App.css';
import authServices from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(setLoading(false));
  }, []);

  return (
    <>
      {loading && <p>Loading..</p>}
      <Header />
      <Footer />
    </>
  );
}

export default App;
