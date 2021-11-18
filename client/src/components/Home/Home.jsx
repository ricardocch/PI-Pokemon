import style from './Home.module.css';
import { connect } from 'react-redux';
import { getTotalPokemons,reset } from '../../actions';
import { useEffect } from 'react';
import Loading from './Loading/Loading';
import CardContainer from './CardContainer/CardContainer';
import Pagination from './Pagination/Pagination';
import ActioonsContainer from './ActioonsContainer/ActioonsContainer';
import NotFound from './NotFound/NotFound';

function Home({getTotalPokemons,Pokemon,TotalPokemons,reset}) {
  
  useEffect( ()=>{
    // reset()
   if(TotalPokemons.length === 0) getTotalPokemons()
  
  },[])


  return (
    <div className={style.Home}>
      {TotalPokemons.length > 0  && <ActioonsContainer/>}
      {TotalPokemons.length > 0 &&  Pokemon.length === 0  && <NotFound/>}
      {TotalPokemons.length === 0 ? <Loading/> : <CardContainer data={Pokemon}/>}
      {Pokemon.length > 0 && <Pagination/>}
    </div>
  );
}

function mapStatetoProps(state){
  return {
    Pokemon:state.toShow,
    Pages:state.totalPages,
    TotalPokemons:state.Pokemons
  }
}
export default connect(mapStatetoProps,{getTotalPokemons,reset})(Home);