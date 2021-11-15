import style from './Pagination.module.css';
import { connect } from 'react-redux';
import {getPage} from '../../../actions/index'
function Pagination({Pages,page,getPage}) {

    function changePage(e){
        window.scroll(0,0)
        getPage(parseInt(e.target.innerText))
    }
  return (
    <div className={style.Pagination}>
      {Pages.map(el=> <button key={el} style={ page === el ? {backgroundColor:'#ebedec'} : {}} onClick={(e)=> changePage(e)}>
          {el}
      </button> )}
    </div>
  );
}

function mapStatetoProps(state){
  return {
    Pages:state.totalPages,
    page: state.page
  }
}
export default connect(mapStatetoProps,{getPage})(Pagination);