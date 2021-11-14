import style from './Pokedex.module.css';

function Pokedex({id,
    name,
    img,
    type,
    height,
    weight,
    hp,
    attack,
    defense,
    speed}) {

  return (
        <div className={style.Pokedex}>
            <div>
                <img src="/PokedexSup.jpg" alt="BAckgraind"/>
            </div>
            <div className={style.Middle}>
                <div className={style.Display}>
                        <img src={img} alt="Imaagen de Pokemon"  />
                        <h3>{id}</h3>
                        <h3>{name.toUpperCase()}</h3>
                        <div className={style.info}>
                            <h4>Height:{height}</h4>
                            <h4>weight:{weight}</h4>
                            <h4>HP:{hp}</h4>
                            <h4>Speed:{speed}</h4>
                            <h4>Attack:{attack}</h4>
                            <h4>Defense:{defense}</h4>
                        </div>
                        <h4>Type:{type}</h4>
                </div>
            </div>
            <div>
                <img src="/PokedexDown.jpg" alt="BAckgraind"/>
            </div>
        </div>
  );
}

export default Pokedex;