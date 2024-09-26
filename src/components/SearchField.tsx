import React, {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

export default function SearchField() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm')?.toString());

  function navigateToSearchResult(): void {
    navigate({ pathname: '/search/', search: `?searchTerm=${searchTerm}` });
  }

  return (
    <div className={'card-block d-flex'}>
      <input className={'form-control container__margin-right--05'} value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}/>
      <button className={'btn btn-outline-secondary'} disabled={searchTerm === ''} onClick={navigateToSearchResult}>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-search container__svg' viewBox='0 0 16 16'>
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0'/>
        </svg>
      </button>
    </div>
  );
}