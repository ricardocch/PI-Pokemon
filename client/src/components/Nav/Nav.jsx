import style from './Nav.module.css';
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';
import { search,getByName } from '../../actions';
import { useRef } from 'react';

function Nav({search,getByName}) {
  let name = useRef('')
  let location = useLocation()
  let navigate = useNavigate();
  
  // function onSearch(){
  //   search(name.current.value)
  // }

  // function onchange(e){
  //   if(e.target.value === '') search('')
  // }

  function onSearchName(){
    getByName(name.current.value.toLowerCase())
    navigate(`/detail?name=${name.current.value}`)
  }

  function onchangeName(e){
    if(e.target.value === '') navigate("/home")
  }

  return (
    <div className={style.Nav}>
      <Link to="/Home" >
        <img src="/Logo.png" alt=""/>
      </Link>
      {location.pathname !== "/" && <div className={style.Actions}>
        <Link to="/create" className={style.navAction}>
          <span>Add Pokemon</span>
        </Link>
        {/* <input type="text" placeholder="Enter Pokemon name" ref={name} onChange={(e)=> onchange(e)}/><button onClick={(e)=> onSearch()}>Search</button> */}
        <input type="text" placeholder="Enter Pokemon name" onChange={(e)=> onchangeName(e)} ref={name}/><button onClick={(e)=> onSearchName()}>Search</button>
      </div>}
      
    </div>
  );
}

// export default connect(null,{search})(Nav);
export default connect(null,{getByName})(Nav);