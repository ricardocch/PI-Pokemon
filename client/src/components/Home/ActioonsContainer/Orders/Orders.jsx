import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { orderBy } from '../../../../actions';
import style from './Orders.module.css';

function Orders({orderBy}) {
    let [order,setOrder] = useState('ASC')
    let select = useRef('')
    function changeOrder(e){
         
        e.target.innerText.substring(0,1) === 'D' ? setOrder('DESC') : setOrder('ASC')
        console.log();
        orderBy({value:select.current.value,
            order:e.target.innerText.substring(0,1) === 'D' ? 'DESC' : 'ASC'
        })
    }

    function onChange(e){
        orderBy({value:e.target.value,order})
    }


  return (
    <div className={style.Orders}>
      <label>Order by:</label>
      <select onChange={(e) => onChange(e)} ref={select}>
          <option value=""></option>
          <option value="Name"> Name</option>
          <option value="Attack"> Attack</option>
          <option value="Defense"> Defense</option>
          <option value="Speed"> Speed</option>
          <option value="HP"> HP</option>
          <option value="Height"> Height</option>
          <option value="Weight"> Weight</option>
          <option value="Type"> Type</option>
      </select>
      { order === 'ASC' ? <button onClick={(e)=> changeOrder(e)}>DESC ↓↓</button> : <button onClick={(e)=> changeOrder(e)}>ASC ↑↑</button>}

    </div>
  );
}

export default connect(null,{orderBy})(Orders) 