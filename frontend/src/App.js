import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import Login from './pages/Login';
import Upload from './pages/Upload';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      {user ? <Upload user={user} /> : <Login />}
    </div>
  );
}

export default App;