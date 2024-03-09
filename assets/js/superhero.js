//recoger input de usuario
const btnBuscar = $("#btn-buscar");
const btnRandom = $("#btn-random");
const input = $("input");

function encontrarSuperHero(){
    $.ajax({
        url: `https://superheroapi.com/api.php/10225928059845850/${input.val()}`,
        type: 'GET',
        dataType: 'json',
        success: function(data){
            //verificar si el id no posee información en la API
            if (data.response == "error"){
                $("#myModal").modal('show');
                return false
            }
            else{
                //destructuracion data
                let {name: nombre} = data 
                let {url: urlImagen} = data.image
                let {publisher: publicado, "first-appearance": debut, alignment: alineamiento, "full-name": nombreReal} = data.biography
                let {occupation: ocupacion} = data.work
                let {height: altura, weight: peso} = data.appearance
                let {"group-affiliation": conexiones} = data.connections

                $("#info-img").attr('src',`${urlImagen}`)
                $("#info-nombre").html(nombre);
                $("#info-nombreReal").html(`<i>Nombre real: </i>${nombreReal}`)
                $("#info-conexiones").html(`<i>Conexiones: </i>${nombreReal}`)
                $("#info-publicado").html(`<i>Publicado por</i>: ${publicado}`)
                $("#info-ocupacion").html(`<i>Ocupación</i>: ${ocupacion}`)
                $("#info-debut").html(`<i>Primera aparición</i>: ${debut}`)

                alturahtml = "<i>Altura</i>: " + ((altura[1] == "0 cm")? "-" : altura[1]) //filtro para cuando no hay información de altura
                $("#info-altura").html(alturahtml)

                pesohtml = "<i>Peso</i>: " + ((peso[1] == "0 kg")? "-" : peso[1]) //filtro para cuando no hay información de altura
                $("#info-peso").html(pesohtml)

                $("#info-alianzas").html(`<i>Alianzas</i>: ${conexiones}`)
                $("#info-alineamiento").html(`<i>Alineamiento</i>: ${alineamiento}`)

                let { powerstats } = data;
                let dataPointsSH = [];

                for (let stat in powerstats) {
                let value = parseInt(powerstats[stat]) || 0; // Si el valor es nulo, asigna cero
                dataPointsSH.push({ y: value, label: stat });
                }
                //dibujar canvas a partir del dataPoints

                let chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    animationDuration: 700,
                    exportEnabled: false,
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    title:{
                        text: `Estadísticas de poder para ${nombre}`,
                        fontFamily: "Yanone Kaffeesatz",
                        fontSize: 34

                    },
                    axisY: {
                        includeZero: true
                    },
                    axisX: {
                        labelAngle: -45,
                        labelFontSize: 16
                    },
                    data: [{
                        type: "pie", //change type to bar, line, area, pie, etc
                        indexLabel: "{y}", //Shows y value on all Data Points
                        legendText: "{label}",
                        indexLabel: "{label}: {y}",
                        indexLabelFontColor: "#5A5757",
                        indexLabelFontSize: 16,
                        indexLabelPlacement: "outside",
                        dataPoints: dataPointsSH
                    }]
                });
                chart.render();
            }
        },
        error: function(error){
            alert("Error de comunicación");
            console.log(error)
        }
    })
}

//validación usando números, acepta solo enteros positivos y entrega true o false
function validar(input){
    let num = Number(input);
    return(Number.isInteger(num) && (num > 0))
}

//validación usando regex
//(pendiente)


btnBuscar.click(()=>{
    validar(input.val())
    ? encontrarSuperHero()
    : $("#myModal").modal('show'); //alerta y borra el input inválido
})

btnRandom.click(()=>{
    let rand = Math.floor(Math.random()*732) + 1;
    input.val(rand)
    btnBuscar.click()
})

input.on("keyup", (e)=>{
    if (e.keyCode == 13){
        btnBuscar.click()
    }
})

for (const propiedad in estadisticas) {
  // Comprueba si el valor de la propiedad es null
  if (estadisticas[propiedad] === null) {
    // Asigna 0 al valor de la propiedad
    estadisticas[propiedad] = 0;
  }
}
