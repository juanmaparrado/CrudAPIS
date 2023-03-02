"use strict"

function llamadaAjax(url, datos, metodo) {
    return $.ajax({
        url: url, 
        data: datos, 
        type: metodo,
        dataType: "json"
    });
  }