import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {GetFilteredDataWithBreadcrumb, SearchByCategoryResult} from '../services/data.service';
import Card from './Card';
import Breadcrumbs from './Breadcrumbs';

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState([] as SearchByCategoryResult[]);

  useEffect((): void => {
    const fetchResult = async (): Promise<void> => {
      const response = await GetFilteredDataWithBreadcrumb(
        {searchTerm: searchParams.get('searchTerm')?.toString() ?? ''});
      setSearchResult(response);
    };
    fetchResult().then();
  }, [searchParams]);

  return (
    <div className='card-block'>
      <div className='card-block__container'>
        {searchResult?.map((o, index) =>
          <div key={index}>
            <Breadcrumbs breadcrumbs={o.breadcrumbs} />
            {o?.items?.map(category => (
              <Card key={category.id} item={category}/>
            ))}
          </div>
        )}
        {searchResult.length === 0 && <h3 className={'text-center'}>Ничего не найдено</h3>}
      </div>
    </div>
  );
}