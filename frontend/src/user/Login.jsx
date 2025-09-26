import React, { useEffect, useState } from 'react';
import '../Style/UserStyles/Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeError } from '../slice/users/userslice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';
import PageTitle from '../components/PageTitle.jsx';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (!email || !password) {
      toast.error('Please fill all fields', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
    
    dispatch(login({ email, password }));
  };

  // عرض الأخطاء
  useEffect(() => {
    if (error) {
      toast.error(typeof error === 'string' ? error : error?.message || 'Login failed', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  // بعد تسجيل الدخول الناجح
  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 3000,
      });
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
    {loading ? (<Loader/>):(<>
    <PageTitle title="Login Page" />
    <div className="form-container container">
      <div className="form-content">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button className="authBtn" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p className="form-links">
            Don’t have an account? <Link to="/register">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
    </>)}
    </>
  );
};

export default Login;
