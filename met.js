const request = require('request')

const stringSearch = function (searchString, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='+ searchString

    request({url: url, json: true}, function(error, response){  
        if(error){
            const error1={
                error: 'Service unavailable'
            }
            callback(error1, undefined)
        }
        else if(response.body.total==0){
            const error2={
                error: 'No se encontraron registros'
            }
            callback(error2, undefined)
        }
        else{
            const data={
                objectID: response.body.objectIDs[0]
            }
            callback(undefined, data)
        }

    })
}

const idSearch= function (id, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+ id
    request({url: url, json: true}, function(error, response){
        if(error){
            const error1={
                error: 'Service unavailable'
            }
            callback(error1, undefined)
        }
        else{
            const data ={
                artist: response.body.constituents[0].name,
                title: response.body.title,
                year: response.body.objectEndDate,
                technique: response.body.medium,
                metURL: response.body.objectURL
            }
            callback(undefined, data)
        }
    })
}

module.exports= {
    stringSearch: stringSearch,
    idSearch: idSearch
}