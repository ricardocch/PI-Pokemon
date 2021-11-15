import style from './Filters.module.css';
import { connect } from 'react-redux';
import { filterCreated, getTypes } from '../../../../actions';
import { useEffect, useRef } from 'react';

function Filters({types,getTypes,filterCreated}) {

    let selectType = useRef('')
    let selectCreate = useRef('')
    useEffect(()=>{
        if(types.length === 0)  getTypes()
    },[])
    
    function onChange(){
    
        filterCreated({Type:selectType.current.value,created:selectCreate.current.value})
    }
    
  return (
    <div className={style.Filters} onChange={(e)=> onChange()}>
        <label>Filter by:</label>
        <select  ref={selectType}>
            <option value="">Type</option>
            { types.length === 0 ? <option>Cargando...</option> 
                : types.map(el => <option key={el.id} value={el.name}>{el.name}</option>)
            }
        </select>

        {/* <label>Exist:</label> */}
        <select ref={selectCreate} onChange={(e)=> onChange()}>
            <option value="">Is Created?</option>
            <option value="N">Not Crated</option>
            <option value="C">Created</option>
        </select>
    </div>
  );
}

function mapStateToProps(state){
    return {
        types:state.types
    }
}

export default connect(mapStateToProps,{getTypes,filterCreated})(Filters)