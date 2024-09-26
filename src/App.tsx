import React, {useEffect, useState} from 'react';
import './App.scss';
import {Col, Container, Form} from 'react-bootstrap';
import {Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";


export default function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showBackButton, setShowBackButton] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm')?.toString());
  let location = useLocation();

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    setShowBackButton(location.pathname !== '/');
  }, [location]);

  function navigateToSearchResult(): void {
    navigate({ pathname: '/search/', search: `?searchTerm=${searchTerm}` });
  }

  return (
      <Container className={isDarkMode ? 'container--dark' : ''}>
        <Col lg={1} md={1} sm={1}>
          <aside className='container__aside'>
            <div className={'d-flex pt-5 justify-content-center'}>
              <label className={'container__margin-right--05'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-brightness-high-fill container__svg" viewBox="0 0 16 16">
                  <path
                    d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                </svg>
              </label>
              <Form.Check
                type="switch"
                className={'btn-secondary'}
                label={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-moon-fill container__svg" viewBox="0 0 16 16">
                    <path
                      d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                  </svg>
                }
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
              />
            </div>
          </aside>
        </Col>
        <Col className={'flex-grow-1'}>
          <header>
            {showBackButton &&
              <span className={'button--go-back'} onClick={() => navigate(-1)}>
              🠔
              </span>
            }
            <label className={'fw-bold'}>Текстильные услуги</label>
          </header>
          <main>
            <div className={'card-block d-flex'}>
              <input className={'form-control container__margin-right--05'} value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}/>
              <button className={'btn btn-outline-secondary'}
                      disabled={searchTerm === ''}
                      onClick={navigateToSearchResult}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-search container__svg" viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
            </div>
            <Outlet/>
          </main>
        </Col>
      </Container>
  );
}
