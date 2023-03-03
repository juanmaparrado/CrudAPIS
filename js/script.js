const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '291c7b04a9mshd3dfc1e428c6153p15274bjsnb2b4d6fd47de',
    'X-RapidAPI-Host': 'world-population3.p.rapidapi.com'
  }
};
const countries = ['FRA', 'ITA', 'ESP','POL','UKR','ALB','AND', 'AUT','BLR','BEL','HRV','CZE','DEU', 'NLD', 'CHE', 'SWE', 'NOR', 'FIN', 'DNK', 'ISL','DZA','AGO','CMR','CAF','COD','GNQ','GHA','GIN','CIV','KEN','MDG','AUS','PNG','NZL','FJI','FJI','RUS','GBR','ROU','ZWE'];
const requests = countries.map(country => fetch(`https://world-population3.p.rapidapi.com/${country}`, options));
let datos = [];
let data = null;
var myChart;

//LLAMADA AJAX

function llamadaAjax(url, datos, metodo) {
  return $.ajax({
      url: url, 
      data: datos, 
      type: metodo,
      dataType: "json"
  });
}

//************          GENERAR             **********************/

document.getElementById('generate-btn').addEventListener('click', () => {
  Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      data.forEach(({ Country, '1970 Population':Population1970, '2022 Population': Population2022, 'Area (km²)':Area }) => {
        datos.push({ country: Country, population1970: Population1970, population2022: Population2022, area: Area });
      });
      console.log("LOS DATOS DESDE LA API SE HAN GENERADO");
  })
    .catch(err => console.error(err));
});

//************          GUARDAR             **********************/

document.getElementById('save-btn').addEventListener('click', () => {
  let peticionAjax = llamadaAjax('./php/guardar.php', JSON.stringify(datos), 'POST'); 
  console.log("----------DATOS GUARDADOS---------");

});

//************          BORRAR             **********************/

document.getElementById('delete-btn').addEventListener("click", () => {
  let peticionAjax = llamadaAjax('./php/borrar.php', JSON.stringify(datos), 'POST');
  console.log("---------DATOS ELIMINADOS---------");
});
//************          MOSTRAR             **********************/

document.getElementById('show-btn').addEventListener("click", () => {
  llamadaAjax('./php/mostrar.php', null, 'GET')
    .then(response => {
      console.log("-------MOSTRANDO DATOS--------")
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

/************          MOSTRAR PAGINADO     ***********************/
var currentPage = 1; // página actual
var recordsPerPage = 10; // cantidad de registros por página

document.getElementById('showpag-btn').addEventListener("click", () => {
  llamadaAjax('./php/mostrar.php', null, 'GET')
    .then(response => {
      console.log("-------MOSTRANDO DATOS--------")
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
      
      // Calcular los índices de inicio y fin de los registros a mostrar
      var startIndex = (currentPage - 1) * recordsPerPage;
      var endIndex = startIndex + recordsPerPage;
      
      // Recorrer los datos del objeto JSON y agregar las filas de datos correspondientes a la página actual
      for (var i = startIndex; i < endIndex && i < response.length; i++) {
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

var prevButton = document.getElementById("prev-btn");
var nextButton = document.getElementById("next-btn");
var firstButton = document.getElementById("first-btn");
var lastButton = document.getElementById("last-btn");

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    document.getElementById("showpag-btn").click(); // volver a llamar a la función que muestra los registros
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < Math.ceil(response.length / recordsPerPage)) {
    currentPage++;
    document.getElementById("showpag-btn").click(); // volver a llamar a la función que muestra los registros
  }
});

firstButton.addEventListener("click", () => {
  currentPage = 1;
  document.getElementById("showpag-btn").click(); // volver a llamar a la función que muestra los registros
});

lastButton.addEventListener("click", () => {
  currentPage = Math.ceil(response.length / recordsPerPage);
  document.getElementById("showpag-btn").click(); // volver a llamar a la función que muestra los registros
});


/************          MOSTRAR ORDENADO     **********************/

document.getElementById('showorder-btn').addEventListener("click", () => {
  llamadaAjax('./php/mostrarOrdenado.php', null, 'GET')
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

//************          GRAFICO             **********************/
document.getElementById('chart-btn').addEventListener("click", () => {
  llamadaAjax('./php/mostrar.php', null, 'GET')
    .then(response => {
      var countries = [];
      var population1970 = [];
      var population2022 = [];
      var area = [];

      for (var i = 0; i < response.length; i++) {
          countries.push(response[i].country);
          population1970.push(response[i].population1970);
          population2022.push(response[i].population2022);
          area.push(response[i].area);
      }

      if (response.length === 0) {
        console.log('*****NO SE PUEDE MOSTRAR EL GRAFICO*********');
        return;
      }
      var chartData = {
        labels: countries,
        datasets: [
          {
            label: "Población en 1970",
            data: population1970,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
          },
          {
            label: "Población en 2022",
            data: population2022,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          },
        {
          label: "Diferencia de población",
          data: population2022.map((val, index) => {
            return val - population1970[index];}),
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1
        }
        ]
      };
      var ctx = document.getElementById('myChart').getContext('2d');
      myChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
  });

  //************          CHART ORDENADO      **********************/
  document.getElementById('chartorder-btn').addEventListener("click", () => {
    //elimina el grafico ya existente
    if (myChart) {
      myChart.destroy();
    }
    llamadaAjax('./php/mostrarOrdenado.php', null, 'GET')
      .then(response => {
        var countries = [];
        var population1970 = [];
        var population2022 = [];
  
        for (var i = 0; i < response.length; i++) {
            countries.push(response[i].country);
            population1970.push(response[i].population1970);
            population2022.push(response[i].population2022);
        }
  
        if (response.length === 0) {
          console.log('*****NO SE PUEDE MOSTRAR EL GRAFICO*********');
          return;
        } 

        var chartData = {
          labels: countries,
          datasets: [
            {
              label: "Población en 1970",
              data: population1970,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1
            },
            {
              label: "Población en 2022",
              data: population2022,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1
            },
          {
            label: "Diferencia de población",
            data: population2022.map((val, index) => {
              return val - population1970[index];}),
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1
          }
          ]
        };
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
    });