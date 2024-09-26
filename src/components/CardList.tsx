import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Category, GetDataByCategory} from '../services/data.service';
import Card from './Card';

const normalizeName = (name: string) => {
  return name?.replace(/^\d+\.\d+\.\s*/, ''); // Удаляем числа в начале
};

export default function CardList(){
  const { categoryId, subcategoryId } = useParams();
  const [category, setCategory] = useState({} as Category);

  useEffect((): void => {
    const fetchCategory = async (): Promise<void> => {
      const response = await GetDataByCategory({categoryId, subcategoryId});
      setCategory(response);
    };

    fetchCategory().then();
  }, [categoryId, subcategoryId]);

  return (
    <div>
      <div className='mt-5 card-block'>
        <h2>{normalizeName(category?.name)}</h2>
        <div className='card-block__container'>
          {category?.children?.map(category => (
            <Card key={category.id} item={category}/>
          ))}
        </div>
      </div>
    </div>
  );
}