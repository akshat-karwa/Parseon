import React, { useState } from 'react';
import {
  auth,
  googleProvider,
} from '../firebase';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Signed in as ${result.user.email}`);
    } catch (err) {
      alert(`Google sign-in failed: ${err.message}`);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
        let result;
        if (isLogin) {
        result = await signInWithEmailAndPassword(auth, email, password);
        alert(`Logged in as ${result.user.email}`);
        } else {
        result = await createUserWithEmailAndPassword(auth, email, password);
        alert(`Signed up as ${result.user.email}`);
        }
    } catch (err) {
        alert(err.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!email) return alert('Enter your email first.');
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleEmailAuth} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      {isLogin && (
        <button onClick={handleForgotPassword} style={styles.linkButton}>
          Forgot Password?
        </button>
      )}
      <hr style={styles.hr} />
      <button onClick={handleGoogleLogin} style={styles.button}>
        Sign in with Google
      </button>
      <p>
        {isLogin ? 'New user?' : 'Already have an account?'}{' '}
        <span onClick={() => setIsLogin(!isLogin)} style={styles.link}>
          {isLogin ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '250px',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  link: {
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  hr: {
    width: '80%',
    margin: '1rem 0',
  },
};

export default Login;
