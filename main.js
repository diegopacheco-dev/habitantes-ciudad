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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function displayMatches() {
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place => {
        console.log(this.value);
        // creamos un regExp con el valor ingresado al input
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
            `
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)