//Plugin de consulta

$(document).ready(function(){
    
    $( "#formP" ).submit(function( event ) {
      event.preventDefault();
      var valueNumber = $("#numberP").val();
      $(".content__pokeI").empty();
      $(".content__pokeH").empty();
      //console.log(valueNumber);//toma el valor ingresado
      if(valueNumber !== null && valueNumber !== undefined) {
        $.ajax({
          url: `https://pokeapi.co/api/v2/pokemon/${valueNumber}/`, //ajax pokeAPI
        }).done(function( data ) {
          if ( data ) {
            var dataChart = data.stats;
            //var largo = dataChart.length;
            //console.log(largo);
            for(var i = 0; i < dataChart.length; i++){ // ciclos.
                dataChart[i].label = dataChart[i]['stat'].name;
                dataChart[i].y = dataChart[i]['base_stat'];
            }
            //console.log( "Sample of data:", data );
            $(".content__pokeI").append(`<div class="text-center content__pokeI--titulo"> <h3>${data.name}<h3> <div>`); //jquery
            $(".content__pokeI").append(`<img class="content__pokeI--img" src="${data.sprites.front_default}" alt="${data.name}"> <img>`);
            $(".content__pokeI").append(`<div class="text-center content__pokeI--peso"> <p>Peso: ${data.weight/10} [kg]<p> <div>`);
            var options = {
              animationEnabled: true,
              title: {
                text: "Stats Base"
              },
              axisY: {
                title: "Value",
                includeZero: false
              },
              axisX: {
                title: "Stats"
              },
              data: [{
                type: "column",
                dataPoints: dataChart
              }]
            };
            $(".content__pokeH").CanvasJSChart(options);
          }
        });
      }
    });
  });