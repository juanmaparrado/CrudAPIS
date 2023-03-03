const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '291c7b04a9mshd3dfc1e428c6153p15274bjsnb2b4d6fd47de',
    'X-RapidAPI-Host': 'world-population3.p.rapidapi.com'
  }
};
const countries = ['FRA', 'ITA', 'ESP','POL','UKR','ALB','AND', 'AUT','BLR','BEL','HRV','CZE','DEU', 'NLD', 'CHE', 'SWE', 'NOR', 'FIN', 'DNK', 'ISL','DZA','AGO','CMR','CAF','COD','GNQ','GHA','GIN','CIV','KEN','MDG','AUS','PNG','NZL','FJI','FJI','VAT','GBR','ROU','ZWE'];
const requests = countries.map(country => fetch(`https://world-population3.p.rapidapi.com/${country}`, options));
let datos = [];
let data = null;

//LLAMADA AJAX
function llamadaAjax(url, datos, metodo) {
  return $.ajax({
      url: url, 
      data: datos, 
      type: metodo,
      dataType: "json"
  });
}

document.getElementById('generate-btn').addEventListener('click', () => {
  Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      data.forEach(({ Country, '1970 Population':Population1970, '2022 Population': Population2022, 'Area (km²)':Area }) => {
        datos.push({ country: Country, population1970: Population1970, population2022: Population2022, area: Area });
      });
      console.log("GENERANDO LOS DATOS DESDE LA API");
  })
    .catch(err => console.error(err));
});

document.getElementById('save-btn').addEventListener('click', () => {
  let peticionAjax = llamadaAjax('./php/guardar.php', JSON.stringify(datos), 'POST'); 
  console.log("----------DATOS GRABADOS---------");

});

document.getElementById('delete-btn').addEventListener("click", () => {
  let peticionAjax = llamadaAjax('./php/borrar.php', JSON.stringify(datos), 'POST');
  console.log("---------DATOS ELIMINADOS---------");
});

document.getElementById('show-btn').addEventListener("click", () => {
  llamadaAjax('./php/mostrar.php', null, 'GET')
    .then(response => {
      console.log(response);
      console.log("MOSTRANDO DATOS")
      var outputDiv = document.getElementById("output");
      outputDiv.innerHTML="";
      // Crear una tabla HTML
      var table = document.createElement("table");
      
      // Agregar las etiquetas thead y tbody a la tabla
      var tableHead = table.createTHead();
      var tableBody = table.createTBody();
      
      // Crear las filas de encabezado de la tabla
      var headerRow = tableHead.insertRow();
      var headerCell1 = document.createElement("th");
      headerCell1.textContent = "Country";
      headerRow.appendChild(headerCell1);
      var headerCell2 = document.createElement("th");
      headerCell2.textContent = "Population1970";
      headerRow.appendChild(headerCell2);
      var headerCell3 = document.createElement("th");
      headerCell3.textContent = "Population2022";
      headerRow.appendChild(headerCell3);
      var headerCell4 = document.createElement("th");
      headerCell4.textContent = "Area";
      headerRow.appendChild(headerCell4);
      
      // Recorrer los datos del objeto JSON y agregar las filas de datos
      for (var i = 0; i < response.length; i++) {
        var dataRow = tableBody.insertRow();
        var dataCell1 = dataRow.insertCell();
        dataCell1.textContent = response[i].country;
        var dataCell2 = dataRow.insertCell();
        dataCell2.textContent = response[i].population1970;
        var dataCell3 = dataRow.insertCell();
        dataCell3.textContent = response[i].population2022;
        var dataCell4 = dataRow.insertCell();
        dataCell4.textContent = response[i].area;
      }

      outputDiv.appendChild(table);
    })
    .catch(error => console.error(error));
});