const { Router } = require('express');
const axios = require('axios');
const {Pokemon,Type} = require('../db.js');
const server = require('../app.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/types", function(req,res){
    res.set('Content-Type', 'application/json');
  

    axios.get('https://pokeapi.co/api/v2/type')
    .then(json => {
        
        let arrPromise = json.data.results.map( el => { 
            return Type.findOrCreate({
                where: { name: el.name},
                defaults: {
                    name: el.name
                }
            })
        })
        
        return Promise.all(arrPromise)
      
    }).then( p => { 
        let types  = p.map( el =>{
            return {id:el[0].id, name:el[0].name}
        })
    
        return res.status(200).send(types)
    })
    .catch( err => {
       return res.status(500).send({err})
    });

} )

router.get("/pokemons", async function(req,res){
    let query = req.query.hasOwnProperty('name') ? {where:{name:decodeURI(req.query.name)},include:Type} : {include:Type}

    try{
    
    let PokemonsDB = await Pokemon.findAll(query);
    let pokemonAPI = null;
    
    PokemonsDB = PokemonsDB.map( el =>{
        let localArrTypes = el.types.map( el => el.name)
        
        return {
            id:el.id,
            name:el.name,
            height:el.height,
            weight:el.weight,
            hp:el.hp,
            attack:el.attack,
            defense:el.defense,
            speed:el.speed,
            created:true,
            img:'',
            types:localArrTypes
        }
    })
    
    if(req.query.hasOwnProperty('name')){
        
        try{
            let tempArray = []
            pokemonAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`)
            tempArray.push(pokemonAPI) 
            pokemonAPI = tempArray;
        }
        catch{
            pokemonAPI = [];
        }
        
    }
    else{
        
        // endpoint sin parametros
        // pokemonAPI = await axios.get('https://pokeapi.co/api/v2/pokemon')
        // let SecondPart = await axios.get(pokemonAPI.data.next)
        // pokemonAPI = pokemonAPI.data.results.map(el =>{
        //     return axios.get(el.url)
        // })

        // SecondPart = SecondPart.data.results.map(el =>{
        //     return axios.get(el.url)
        // })

        // pokemonAPI = [...pokemonAPI,...SecondPart]

        // pokemonAPI = await Promise.all(pokemonAPI)

        //endpoint con parametros
        pokemonAPI = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
        
        pokemonAPI = pokemonAPI.data.results.map(el =>{
            return axios.get(el.url)
        })

        pokemonAPI = await Promise.all(pokemonAPI)
        
    }

    pokemonAPI = pokemonAPI.map(el => {
            
        let localArrTypes = el.data.types.map( el => el.type.name)
        return {
            id:el.data.id,
            name:el.data.name,
            height:el.data.height,
            weight:el.data.weight,
            hp:el.data.stats[0].base_stat,
            attack:el.data.stats[1].base_stat,
            defense:el.data.stats[2].base_stat,
            speed:el.data.stats[5].base_stat,
            created:false,
            img:el.data.sprites.front_default,
            types:localArrTypes
        }
    });
    
    res.status(200).send([...pokemonAPI,...PokemonsDB])
    }
    catch(err){
        // console.log(err)
        res.status(404).send(err)
    }
})

router.get("/pokemons/:id", async function(req,res){
    let responseJSON = {}
    if(req.params.id.toString().length <= 4){
        responseJSON = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
        let localArrTypes = responseJSON.data.types.map( el => el.type.name)
        responseJSON = {
            id:responseJSON.data.id,
            name:responseJSON.data.name,
            height:responseJSON.data.height,
            weight:responseJSON.data.weight,
            hp:responseJSON.data.stats[0].base_stat,
            attack:responseJSON.data.stats[1].base_stat,
            defense:responseJSON.data.stats[2].base_stat,
            speed:responseJSON.data.stats[5].base_stat,
            img:responseJSON.data.sprites.front_default,
            types:localArrTypes
        }
    }
    else{
        responseJSON = await Pokemon.findByPk(req.params.id, {
            include:Type
        })

        let localArrTypes = responseJSON.types.map( el => el.name)
        
        responseJSON = {
            id:responseJSON.id,
            name:responseJSON.name,
            height:responseJSON.height,
            weight:responseJSON.weight,
            hp:responseJSON.hp,
            attack:responseJSON.attack,
            defense:responseJSON.defense,
            speed:responseJSON.speed,
            img:'',
            types:localArrTypes
        }
    }

    res.status(200).send([responseJSON])
})



router.post('/pokemons',async function(req,res){
 
    try{
        let instance = await Pokemon.create({ 
            name: req.body.name,
            weight:req.body.weight,
            height:req.body.height,
            hp:req.body.hp,
            attack:req.body.attack,
            defense:req.body.defense,
            speed:req.body.speed
        });

        
       instance.addTypes(req.body.type)
        
        res.status(200).send({...instance.toJSON(),succes:'Pokemon Creado con Exito'})
    }
    catch(err){
        res.status(500).send({errMesage:'Fallo en la creación',err})
    }
})

module.exports = router;
