const express = require ('express')
const path = require('path')
const app = express()
const publicDir = path.join(__dirname,'public')
const met = require('./met.js')
const port = process.env.PORT || 3000

app.use(express.static(publicDir))


app.get('/students/:id', function(req,res){
    if(req.params.id=='A00818965'){
        res.send({
            "id": "A00818965",
            "fullname": "Jose Cruz Juarez Lopez",
            "nickname": "Chief",
            "age": 87
        })
    }
    else{
        return res.send({
            error: 'Matricula equivocada'
        })
    }
})


app.get('/met', function(req, res){
    res.setHeader('Access-Control-Allow-Origin','*')
    if(!req.query.search){
            res.send({
            error:'No se ingreso un string a buscar'
        })
    }
    met.stringSearch(req.query.search, function(error, response){
            if(error){
                return res.send(error)
            }
            else{
                return met.idSearch(response.objectID, function(error,response){
                    if(error){
                        return res.send(error)
                    }
                    return res.send({
                        searchTerm: req.query.search,
                        artist: response.artist,
                        title: response.title,
                        year: response.year,
                        technique: response.technique,
                        metURL: response.metURL
                    })
                }
                )
            }
        })
})


app.get('*', function(req, res){
    res.send({
        error:'Esta ruta no existe'
    })
})

app.listen(port, function(){
    console.log('up and running')
})
//npm install -g nodemon 