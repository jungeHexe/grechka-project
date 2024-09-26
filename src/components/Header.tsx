import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showBackButton, setShowBackButton] = useState(false);

  useEffect((): void => {
    setShowBackButton(location.pathname !== '/');
  }, [location]);

  return (
    <header>
      {showBackButton &&
        <span className={'button--go-back'} onClick={() => navigate(-1)}>
          🠔
        </span>
      }
      <label className={'fw-bold'}>Текстильные услуги</label>
    </header>
  );
}