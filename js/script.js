const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '291c7b04a9mshd3dfc1e428c6153p15274bjsnb2b4d6fd47de',
    'X-RapidAPI-Host': 'world-population3.p.rapidapi.com'
  }
};

const countries = ['FRA', 'ITA', 'ESP','POL','UKR'];
const requests = countries.map(country => fetch(`https://world-population3.p.rapidapi.com/${country}`, options));

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

document.getElementById('show-btn').addEventListener('click', () => {
  if (data) {
    dataContainer.innerHTML = '';

    data.forEach(({ Country, '1970 Population':Population1970, '2022 Population': Population2022, 'Area (km²)':Area }) => {
      const countryTable = document.createElement('tr');
      countryTable.innerHTML += `
        <td>${Country}</td>
        <td> ${Population1970}</td>
        <td>${Population2022}</td>
        <td>${Area}</td>
      `;
      dataContainer.appendChild(countryTable);
      console.log("Datos mostrados");
    });
  } else {
    console.log('Primero debes generar los datos.');
  }
});

document.getElementById('borrar-datos').addEventListener('click', () => {
  dataContainer.innerHTML = '';
  console.log("Datos borrados")
});