import './App.css';
import {Routes,Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Detail from './components/Detail/Deatail';
import FormPokemon from './components/FormPokemon/FormPokemon';

function App() {
  
  return (
    <div className="App">
      
        <Nav/>
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/Home" element={<Home/>}/>
          <Route exact path="/detail/:id" element={<Detail/>}/>
          <Route exact path="/detail" element={<Detail/>}/>
          <Route exact path="/create" element={<FormPokemon/>}/>
          <Route path="/*" element={<Landing/>}/>
          {/* <Route exact path="/add" component={AddTodo}/> */}
        </Routes>
    </div>
  );
}

export default App;
