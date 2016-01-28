'use strict';
//Filtre affichage valider si champ rempli
angular.module('mytodoAppFilters',[]).filter('filtre',
 function(){
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});