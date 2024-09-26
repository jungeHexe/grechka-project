import {Link} from 'react-router-dom';

export interface CardItem {
  id: string;
  name: string;
  price: number;
  minPrice?: number;
  tag: string;
}


export default function Card({ item }: { item: CardItem }) {
  return (
    <div className='card'>
      {item.tag !== 'serv' && <Link to={item.tag + '/' + item.id}>
        <h3>{item.name}</h3>
      </Link>
      }
      {item.tag === 'serv' &&
        <h3>{item.name}</h3>
      }
      {item.price && <p>Цена: {item.price} руб.</p>}
      {item.minPrice && <p>Цена: от {item.minPrice} руб.</p>}
    </div>
  );
};