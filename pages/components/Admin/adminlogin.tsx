import React, { useState } from 'react';
import css from '../Admin/adminlogin.module.scss';
import { AxiosService } from '../../../services/ApiService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const AdminLoginPage: React.FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    setUsernameError(''); // Clear username error when username changes
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(''); // Clear password error when password changes
  };

  const handleLogin = async () => {
    if (!username.trim()) {
      setUsernameError('Please enter a username or email');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter a password');
      return;
    }

    // try {
    //   const response = await AxiosService.post('/login', {
    //     username: username,
    //     password: password,
    //   });

    //   if (response.status === 200) {
    //     toast.success('Logged in successfully');
    //     router.push('/');
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setUsernameError('');
    //   setPasswordError('Failed to authenticate. Please try again.');
    // }
  };

  return (
    <>
      <form>
        <div className={css.admin_heading}>AdminLogin</div>
        <div className={css.admin_Box}>
          <input
            type='text'
            className={css.admin_input}
            placeholder='Username or Email'
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && <span className='text-red-500'>{usernameError}</span>}
          <input
            type='password'
            className={css.admin_input}
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <span className='text-red-500'>{passwordError}</span>}
          <button type='button' onClick={handleLogin} className={css.admin_button} >Login</button><br />
        </div>
      </form>
    </>
  );
}

export default AdminLoginPage;
