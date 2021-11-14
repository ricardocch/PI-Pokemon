import style from './Loading.module.css';

function Loading() {

  return (
    <div className={style.Loading}>
      <img src="/loading.gif" alt="Loading" />
    </div>
  );
}

export default Loading