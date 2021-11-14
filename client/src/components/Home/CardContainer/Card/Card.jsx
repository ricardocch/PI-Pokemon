import style from './Card.module.css';
import {Link} from 'react-router-dom'
function Card({id,name,img,types}) {

  return (
    <div className={style.Card}>

      <img src={img} alt={name}/>
      <div className={style.Header}>
        <h3>{name}</h3>
      </div>
      {types.map(el => <div key={el} className={style.type} style={types.length === 1 ? {padding:'50px 0 '} : {}}>
          <label>Type:{el}</label>
      </div> )}
      <div className={style.goDetail}>
        <Link to={`/detail/${id}`}>
          <button>See Detail</button>
        </Link>
      </div>
    </div>
  );
}

export default Card