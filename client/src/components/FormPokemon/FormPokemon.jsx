import { createPokemon, getTypes,resetStatusCreate } from '../../actions';
import {useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import style from './FormPokemon.module.css';


function FormPokemon({types,createInfo,getTypes,createPokemon,resetStatusCreate}) {
    let navigate = useNavigate();
    let [pokemonTypes,setPokemonTypes] = useState([])
    let [errors,setErros] = useState({})
    let refType = useRef('')
    let refForm = useRef('')
    useEffect(()=>{
        if(types.length === 0)  getTypes()
    },[])

    useEffect(()=>{
    
        if(createInfo !== null && createInfo.hasOwnProperty("succes")){
            resetStatusCreate()
            if (window.confirm('Pokemon Created,Do you want create another pokemon?')) {
                console.log(refForm);
                for(let i = 0; i < refForm.current.length;i++){
                    // console.log(refForm.current[i]);
                    if(refForm.current[i].localName === "input" || refForm.current[i].localName === "select" )  refForm.current[i].value = ''  
                     
                }
                setPokemonTypes([])
              } else {
                navigate(`/Home`)
              }
        }
    },[createInfo])

    function addType(e){
        e.preventDefault()
        let index = pokemonTypes.findIndex( el => el.id === refType.current.value)
        
        if( index < 0 && refType.current.value){
            setPokemonTypes([...pokemonTypes,
                {
                    id:refType.current.value,
                    name:refType.current.options[refType.current.selectedIndex].text
                }
            ])

            setErros({...errors,
                type:false,
                addType:false,
                typeEmty:false
            })
        }else if(refType.current.value === ''){
            setErros({...errors,
                type:true
            })
        }else if(index >= 0){
            setErros({...errors,
                addType:true
            })
        }

    }

    function onRemoveType(e){
        e.preventDefault()
        let typeToRemove = e.target.parentNode.outerText.replace(" X","")
        let arr = pokemonTypes.filter( el => el.name !== typeToRemove)
        setPokemonTypes(arr)
        
    }

    function onBlur(e){
        
  
        
        if(e.target.value === '' || parseInt(e.target.value) === 0 || (e.target.name === 'name' && !/^[A-Za-z]+$/.test(e.target.value))){
            setErros({...errors,
                [e.target.name]:true,
            })
        } 
        else{
            setErros({...errors,
                [e.target.name]:false
            })
        }
    }

    function onSubmit(e){
        e.preventDefault()
  
        let tmpErrors = {}
        let data = {}

        for(let i = 0; i < e.target.length;i++){

            if(e.target[i].localName === "input" && e.target[i].value === '' ) 
                tmpErrors = {...tmpErrors,[e.target[i].name]:true}
            else if(e.target[i].localName === "input" && e.target[i].value !== '')
                data = {...data,[e.target[i].name]: isNaN(Number(e.target[i].value)) ? e.target[i].value : Number(e.target[i].value) }
        }

        if(pokemonTypes.length === 0) 
            tmpErrors = {...tmpErrors,typeEmty:true}
        else
            data = {...data,type:pokemonTypes.map(el =>  Number(el.id))}

        setErros(tmpErrors)
     
        if(Object.keys(tmpErrors).length === 0) createPokemon(data)

    }

  return (
    <div className={style.FormPokemon}>
        <form onSubmit={(e) => onSubmit(e)} ref={refForm}>
            <label>Name</label>
            <input type="text" placeholder="Enter name" name="name" onBlur={(e)=> onBlur(e)} tabIndex="1"/>
            {  errors.name && <span className={style.error }>Name must have only letters</span>}
            <div className={style.columnForm}>
                <label>Height</label>
                <input type="Number" placeholder="0" min="0" name="height" onBlur={(e)=> onBlur(e)} tabIndex="2"/>
            </div>
            <div className={style.columnForm}>
                <label>Weight</label>
                <input type="Number" placeholder="0" min="0" name="weight" onBlur={(e)=> onBlur(e)} tabIndex="3"/> 
            </div>
            <div className={style.rowForm} >
                <div className={style.columnForm}>
                        { errors.height && <span className={style.error}>Height can´t be 0</span>}
                </div>
                <div className={style.columnForm}>
                        { errors.weight && <span className={style.error}>Weight can´t be 0</span>}
                </div>
            </div>
            <div className={style.columnForm}>
                <label>Hp</label>
                <input type="Number" placeholder="0" min="0" name="hp" onBlur={(e)=> onBlur(e)} tabIndex="4"/>
            </div>
            <div className={style.columnForm}>
                <label>Speed</label>
                <input type="Number" placeholder="0" min="0" name="speed" onBlur={(e)=> onBlur(e)} tabIndex="5"/>
            </div>
            <div className={style.rowForm}>
                <div className={style.columnForm}>
                        { errors.hp && <span className={style.error}>HP can´t be 0</span>}
                </div>
                <div className={style.columnForm}>
                        { errors.speed && <span className={style.error}>Speed can´t be 0</span>}
                </div>
            </div>
            <div className={style.columnForm}>
                <label>Attack</label>
                <input type="Number" placeholder="0" min="0" name="attack" onBlur={(e)=> onBlur(e)} tabIndex="6"/> 
            </div>
            <div className={style.columnForm}>
                <label>Defense</label>
                <input type="Number" placeholder="0" min="0" name="defense" onBlur={(e)=> onBlur(e)} tabIndex="7"/>
            </div>
            <div className={style.rowForm}>
                <div className={style.columnForm}>
                        { errors.attack && <span className={style.error}>Attack can´t be 0</span>} 
                </div>
                <div className={style.columnForm}>
                        { errors.defense && <span className={style.error}>Defense can´t be 0</span>}
                </div>
            </div>
            <label> Type:</label>
            <select ref={refType} tabIndex="8">
            <option value="" name="type">Type</option>
                { types.length === 0 ? <option>Cargando...</option> 
                    : types.map(el => <option key={el.id} value={el.id}>{el.name}</option>)
                }
            </select>
            <button onClick={(e) => addType(e)}>Add type</button>
            { errors.type && <span className={style.error }>Select type to add</span>}
            { errors.addType && <span className={style.error }>the type was select, select anoother type </span>}
            { errors.typeEmty && <span className={style.error }>Pokemon must have at least 1 type </span>}
            <div className={style.ContainerType}>
                {pokemonTypes.length > 0 && pokemonTypes.map(el => <button key={el.id} onClick={e => { e.preventDefault()}}> {el.name} <span onClick={(e) => onRemoveType(e)}>X</span></button>) }
            </div>
            <button type="submit">Create Pokemon</button>
        </form>
    </div>
  );
}

function mapStateToProps(state){
    return {
        types:state.types,
        createInfo:state.createInfo
    }
}

export default connect(mapStateToProps,{getTypes,createPokemon,resetStatusCreate})(FormPokemon)