const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '291c7b04a9mshd3dfc1e428c6153p15274bjsnb2b4d6fd47de',
    'X-RapidAPI-Host': 'world-population3.p.rapidapi.com'
  }
};

const countries = ['FRA', 'ITA', 'ESP','POL','UKR'];
const requests = countries.map(country => fetch(`https://world-population3.p.rapidapi.com/${country}`, options));
let datos = [];
let data = null;
document.getElementById('generate-btn').addEventListener('click', () => {
  Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(responses => {
      data = responses;
      console.log('Los datos se han generado.');
      console.log(data);
    })
    .catch(err => console.error(err));
});

const dataContainer = document.getElementById('data-container');
