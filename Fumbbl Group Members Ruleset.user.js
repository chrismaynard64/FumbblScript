// ==UserScript==
// @name         Fumbbl Group Members Ruleset
// @namespace    http://fumbbldata.azurewebsites.net
// @version      0.2
// @description  Add ruleset id to the join requests on a group's teams page. 
// @author       Koadah
// @include      https://fumbbl.com/p/group?op=view&group=*&p=teams
// @grant        none

// ==/UserScript==

(function() {
    'use strict';
    
      $( document ).ready(function() {
          var team_id = getParameterByName("team_id");
          var thing;
        //  alert("Hello World:" + team_id);
          //  $(".pagecontent:nth-child(4)").append("magikkk" + teram_id);
          
         // thing =  $(".pagecontent div:nth-child(4)").append(" <span>magikkk" + team_id + "</span>");
          
          $("div.pagecontent div div table tbody tr:first-child th:last-child").before("<td>Ruleset</td>");
          
          $("table tbody tr.odd td:nth-child(3) a,table tbody tr.even td:nth-child(3) a").each(function () {
              var o = $(this);
              var href = o.attr('href');
              if (!href)
                  return;
              
              var team_id = href.substring(24);
          
              getData(team_id, o[0].parentNode.parentNode);
          
          
          });
          
          
          
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
    
    function doRow() {
        
    }
    
    
    function getData(team_id, p) {
        if (!team_id) return;
       $.getJSON( "https://fumbbl.com/api/team/get/" + team_id, function( data ) {
            //var team = JSON.parse(data);
            var team = data;
           
            if (!team )
                return "";
           
           
           if ( team.ruleset)  {
             $.getJSON( "https://fumbbl.com/api/ruleset/get/" + team.ruleset, function( data ) {
                 //var ruleset = JSON.parse(data);         
                 var ruleset = data;         
                 
                 if (ruleset && ruleset.name)  {
                     $(p).children("td:nth-child(7)").after("<td" + " title=\"" + ruleset.name + "\">(" + team.ruleset  + ")</td>");
                 }  else {
                     $(p).children("td:nth-child(7)").after("<td></td>");                
                 }
             });
            } else {
                  $(p).children("td:nth-child(7)").after("<td></td>");
                
            }
        
        });
    }
      
    
})();