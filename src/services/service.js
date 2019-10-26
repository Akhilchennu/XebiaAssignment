export const service = {
    loginMethod,
    searchService
};

function loginMethod(username){
    return fetch(`https://swapi.co/api/people/?search=${username}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

function searchService(value,signalValue){
    return fetch(`https://swapi.co/api/planets/?search=${value}`,{
        method: 'GET',
        signal:signalValue,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}