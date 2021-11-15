import style from './Detail.module.css';
import {useParams,useLocation,useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import Pokedex from './Pokedex/Pokedex';
import NotFound from '../Home/NotFound/NotFound'
import {getByID,getByName} from '../../actions/index'
import { connect } from 'react-redux';

function Detail({getByID,getByName,Detail}) {
    let {id} = useParams()
    let navigate = useNavigate();
    // let location = useLocation()
    // const sp = new URLSearchParams(location.search);
   useEffect(()=> {

    // id ? getByID(id) :  getByName(sp.get("name"))
    if(id) getByID(id) 
   },[])

   function onBack(){
    navigate("/home")
   }
  return (
    <div className={style.Detail}>
        <div className={style.Back}>
            <img src="/Arrow.png" alt="Back arrow" onClick={onBack}/>
        </div>
       {Detail.hasOwnProperty("name") ? <Pokedex
       id={Detail.id}
       name={Detail.name}
       img={Detail.img !== '' ? Detail.img : '/Agumon.png'}
       type={Detail.types.join()}
       height={Detail.height}
       weight={Detail.weight}
       hp={Detail.hp}
       attack={Detail.attack}
       defense={Detail.defense}
       speed={Detail.speed}
       /> : <NotFound/>}
      {/* <Pokedex/> */}
    </div>
  );
}
function mapStateToProps(state){
    return {
        Detail:state.PokemonDetail
    }
}
export default connect(mapStateToProps,{getByID,getByName})(Detail);