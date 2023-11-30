import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/content/sidebar/Sidebar';
import Login from './components/login/Login';
import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
  const [isLogginIn, setLoginnIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('datosUsuario'));
  });
  console.log("autenticacion :" + isAuthenticated)
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoginnIn(true);
    navigate('/');
    console.log('login es true');
  };

  const handleLogout = () => {
    localStorage.removeItem('datosUsuario')
    setIsAuthenticated(false);
    setLoginnIn(false);
    navigate('/login')
    console.log('login es false');
  };

  useEffect(() => {
    const fetchData = async () => {
      const isAuthenticated = Boolean(localStorage.getItem('datosUsuario'));
      setIsAuthenticated(isAuthenticated);
      console.log("Respuesta de la API:", isAuthenticated);

      if (isAuthenticated) {
        setLoginnIn(true);
      }
    };

    fetchData();
    
  }, []);


  return (
    <div>
      {isLogginIn ? (
        <>
          <Sidebar onLogout={handleLogout} />
          <Outlet />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}

    </div>
  );
}

export default App;
