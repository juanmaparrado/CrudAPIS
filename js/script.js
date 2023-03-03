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
    .then(data => {
      data.forEach(({ Country, '1970 Population':Population1970, '2022 Population': Population2022, 'Area (km²)':Area }) => {
        datos.push({ country: Country, population1970: Population1970, population2022: Population2022, area: Area });
      });
      console.log("GENERANDO LOS DATOS DESDE LA API");
      console.log(datos);
      console.log(JSON.stringify(datos));
  })
    .catch(err => console.error(err));
});
function llamadaAjax(url, datos, metodo) {
  return $.ajax({
      url: url, 
      data: datos, 
      type: metodo,
      dataType: "json"
  });
}
document.getElementById('save-btn').addEventListener('click', () => {
  let peticionAjax = llamadaAjax('./php/guardar.php', JSON.stringify(datos), 'POST'); 
    console.log("LLAMADA REalizadA");
});