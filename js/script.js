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

function generarDatos() {
  Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      datos=[];
      data.forEach(({ Country, '1970 Population':Population1970, '2022 Population': Population2022, 'Area (km²)':Area }) => {
        datos.push({ country: Country, population1970: Population1970, population2022: Population2022, area: Area });
      });
      console.log("GENERANDO LOS DATOS DESDE LA API");
      console.log(datos);
  })
    .catch(err => console.error(err));
}

document.getElementById('generate-btn').addEventListener('click', () => {
  datos=[];
  generarDatos();
});

//LLAMADA AJAX
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
  console.log("DATOS GRABADOS");
  console.log("--------------");
});

document.getElementById('delete-btn').addEventListener("click", () => {
  let peticionAjax = llamadaAjax('./php/borrar.php', JSON.stringify(datos), 'POST');
  console.log("DATOS ELIMINADOS");
  console.log("----------------");
});