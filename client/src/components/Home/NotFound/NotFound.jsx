import style from './NotFound.module.css';

function NotFound() {

  return (
    <div className={style.NotFound}>
        <h3>Pokemon not Found</h3>
        <h5>Please remove filters</h5>
      <img src="/Pikachu.png" alt="Loading" />
    </div>
  );
}

export default NotFound