import style from './ActioonsContainer.module.css';
import Filters from './Filters/Filters';
import Orders from './Orders/Orders';

function ActioonsContainer() {
    
  return (
    <div className={style.ActioonsContainer}>
      <Filters/>
      <Orders/>
    </div>
  );
}

export default ActioonsContainer