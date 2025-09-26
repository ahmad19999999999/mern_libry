import React, { useEffect, useState } from 'react';
import '../Style/UserStyles/Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register, removeError, removeAccess } from '../slice/users/userslice.js';
import Loader from '../components/Loader.jsx';
import PageTitle from '../components/PageTitle.jsx';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = user;

    if (!username || !email || !password) {
      toast.error('Please fill all fields', { position: 'top-center', autoClose: 3000 });
      return;
    }

    // إرسال البيانات بدون avatar
    dispatch(register({ username, email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === 'string' ? error : error?.message || 'Something went wrong',
        { position: 'top-center', autoClose: 3000 }
      );
      dispatch(removeError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Registered successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeAccess());
       navigate('/login'); // إذا بدك يحول تلقائياً بعد التسجيل
    }
  }, [success, dispatch, navigate]);

  return (
    <>
    {loading ? (<Loader/>):(<>
    <PageTitle title="Register page"/>
    <div className="form-container container">
      <div className="form-content">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
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

          <button type="submit" className="authBtn" disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>

              {/* رابط تسجيل الدخول */}
        <p className="form-links">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
        </form>
      </div>
    </div>
    </>)}
    </>
  );
};

export default Register;
