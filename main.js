const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];


// OBTENEMOS LOS DATOS DE LA API
const prom = fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

// FUNCION PARA BUSCAR COINCIDENCIAS ENTRE UNA PALABRA Y UN ARREGLO
function findMatches(wordToMatch, cities){

    // Recorremos el arreglo de ciudades
    // Y filtramos todas las ciudades que hacen match
    return cities.filter(place => {
        
        const regex = new RegExp(wordToMatch, 'gi')
        // si la ciudad actual coincide con la palabra a buscar, entonces retornar
        return place.city.match(regex) || place.state.match(regex) 
        
    })
}
