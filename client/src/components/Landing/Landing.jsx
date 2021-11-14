import style from './Landing.module.css';
import {Link} from 'react-router-dom'
function Landing() {
  return (
    <div className={style.Landing}>
      <img src="/pokemon.png" alt="Imagen home de pokemon" className={style.imgLanding}/>
      <div className={style.welcome}>
          <div className={style.welcome_panel}>
            <h3>Wellcome to Pokemon App</h3>
            <Link to="/Home">
              <button>Enter</button>
            </Link>
          </div>
      </div>
    </div>
  );
}

export default Landing;