// ==UserScript==
// @name         Fumbbl Ruleset
// @namespace    http://fumbbldata.azurewebsites.net
// @version      0.4
// @description  Add ruleset id to team page.
// @author       Koadah
// @include       https://fumbbl.com/p/team*
// @grant        none

// ==/UserScript==

(function() {
    'use strict';
    
      $( document ).ready(function() {
          var team_id = getParameterByName("team_id");
          if (!team_id)
              team_id = getParameterByName("id");
          var thing;
        //  alert("Hello World:" + team_id);
          //  $(".pagecontent:nth-child(4)").append("magikkk" + teram_id);
          
         // thing =  $(".pagecontent div:nth-child(4)").append(" <span>magikkk" + team_id + "</span>");
          getData(team_id);
          
        } );   

      function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    function getData(team_id) {
       $.getJSON( "https://fumbbl.com/api/team/get/" + team_id, function( data ) {
            //var team = JSON.parse(data);
            var team = data;
           
            if (!team || !team.ruleset)
                return;
           
             $.getJSON( "https://fumbbl.com/api/ruleset/get/" + team.ruleset, function( data ) {
                 //var ruleset = JSON.parse(data);         
                 var ruleset = data;         
                 
                 if (ruleset && ruleset.name)
                  $(".pagecontent div.teamheader div:nth-child(2)").append(" <span> - Ruleset: " + ruleset.name + "(" + team.ruleset  + ")</span>");
                 
             });
        
        });
    }
      
    
})();