'use strict';

$(document).ready(init);
var pokemon;

function init() {
  console.log('ok!');

  $('#get').click(getClicked);

  $.ajax("http://pokeapi.co/api/v1/pokedex/1/", {
    success: function(data){
      pokemon = data.pokemon;
  }
  });

  function getClicked() {
    var pokemonName = $('#pokemon').val();
    var selectedPokemon = pokemon.filter(function(obj){
      return obj.name === pokemonName;
    })[0];
    var selectedPokeInfo = selectedPokemon.resource_uri;
    $.ajax("http://pokeapi.co/" + selectedPokeInfo, {
      // CALLBACKS
      success: function(data){
        console.log("data:", data);
        var $infoDiv = $('<div>').addClass('info-div');
        var $name = $('<p>').text("Name: " + data.name);
        var $attack = $('<p>').text("Attack: " + data.attack);
        var $id = $('<p>').text("ID: " + data.national_id);

        console.log("sprite", data.sprites[0].resource_uri);

        var url = "http://pokeapi.co" + data.sprites[0].resource_uri;
        console.log(url)

        $.get(url) 
          .done(function(data) {
            console.log(data);
            console.log(url + data.image);
            var $img = $('<img>').attr('src', 'http://pokeapi.co' + data.image);
            console.log("img", $img);
            $infoDiv.append($name, $attack, $id, $img);
            $('#info').append($infoDiv);
          })
          .fail(function(error) {
            console.log("status:", error.status);
            console.log("error:", error.statusText);
          })
          .always(function(data) {
            console.log("promise resolved!", data)
          });
        
      },
      error: function(error) {
        console.log("status: ", error.status);
        console.log("error: ", error.statusText);
      },
      complete: function(data) {
        console.log("resolved: ", data);
      }
    });
  }
}











// $.ajax({
//   method: 'GET',
//   url: 'http://api.wunderground.com/api/caef4b28f0ff2f7e/forecast/q/CA/San_Francisco.json',
//   success: function(data, status) {
//     // console.log('data:', data);
//     // console.log('status:', status);
//     // data.pokemon.forEach(function(pokemon){
//     //   console.log(pokemon.name);
//     // });
//   },
//   error: function(promise, status, error) {
//     console.log("promise:", promise);
//     console.log("status:", status);  
//     console.log("error:", error);
//   } 
//  }); 