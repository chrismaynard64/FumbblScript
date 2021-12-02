// we will add our javascript code here

var logo;
//var urlRoot = 'http://localhost:1998/';
var urlRoot = 'http://213.251.18.165//fumbblservice5/';
//var urlRoot = 'http://localhost./fumbblservice2/';
var maxs;

$(document).ready(function () {


    $("#report-pane").ajaxStart(function () {
        var width = $(this).width();
        var height = $(this).height();
        $("#report-loading").css({
            top: ((height / 2) - 25),
            left: ((width / 2) - 50)
        }).fadeIn(200);    // fast fade in of 200 mili-seconds
    }).ajaxStop(function () {
        $("#report-loading", this).fadeOut(1000);    // slow fade out of 1 second
    });



    $('#getSprint').click(getSprint);
    // $('#ddSprint').change(sprintChange);
    //  $('#ddRace').change(getSprint);


    sprintSet();
});


function starting() {

    var width = $("#report-pane").width();
    var height = $("#report-pane").height();
 

    $("#report-loading").css({
        top: ((height / 2) - 25),
        left: ((width / 2) - 50)
    }).fadeIn(200);    // fast fade in of 200 mili-seconds
}

function ending() {
    $("#report-loading").fadeOut(1000);    // slow fade out of 1 second

}

function sprintChange() {
        
    getSprint();
}

function sprintSet() {
  /*  var sprintId = $("#ddSprint option:selected").val();
    var raceId = $.query.get('raceId');



    if (sprintId == 8 || sprintId == 9 || sprintId == 2 || sprintId == 3 || sprintId == 12 || sprintId == 13 || sprintId == 18) {
        $("#ddRace").val(9);
        $("#ddRace").attr("disabled", true);
    }
    else {
        if (raceId == "")
            $("#ddRace").val(-1);
        else
            $("#ddRace").val(raceId);
        $("#ddRace").attr("disabled", false);

    }
*/

    var options = {
            datatype: 'clientSide',
            colNames:['Home Race','Played','Wins','Draws','Defeats','Percentage','Home Cas/Game', 'Away Cas/Game', 'Teams', 'Games/Team', 'Home TV', 'Away TV'],
            colModel :[
               { name: 'HomeRace', index: 'HomeRace', width: 160 },
              { name: 'Played', index: 'Played', width: 70, align: 'right', sorttype: 'int' },
              { name: 'Wins', index: 'Wins', width: 70, align: 'right', sorttype: 'int' },
              { name: 'Draws', index: 'Draws', width: 70, align: 'right', sorttype: 'int' },
              { name: 'Defeats', index: 'Defeats', width: 70, align: 'right', sorttype: 'int' },
              { name: 'Percentage', index: 'Percentage', width: 80, align: 'right', sorttype: 'float' },
            { name: 'Home_Cas_Game', index: 'Home_Cas_Game', width: 100, align: 'right', sorttype: 'float' },
            { name: 'Away_Cas_Game', index: 'Away_Cas_Game', width: 100, align: 'right', sorttype: 'float' },
              { name: 'Teams', index: 'Teams', width: 80, align: 'right', sorttype: 'int' },
              { name: 'Games_Team', index: 'Games_Team', width: 80, align: 'right', sorttype: 'int' },
              { name: 'Home_TV', index: 'Home_TV', width: 70, align: 'right', sorttype: 'int' },
              { name: 'Away_TV', index: 'Away_TV', width: 70, align: 'right', sorttype: 'int' },
            ],
            pager: '#pager',
            rowNum:10000,
            height:'100%',
            //width: '100%',
            rowList:[10,20,30],
            sortname: 'invid',
            sortorder: 'desc',
            viewrecords: true,
            caption: 'Race Record'
          };
          

        //options.url =  url;
        //alert(options.url);     
          
        //jQuery("#list2").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});            
        jQuery("#list2").jqGrid(options);      


    getSprint();
}

function getSprint() {

/*

        if (!is_int($('#lowerTV').val()) || !is_int($('#higherTV').val()))
        {
            alert("TV values must be integers");
            return;
        }  */

    //alert($('#higherTV').val());
    var mirrors;


    if ($('#mirrors')[0].checked == true)
        mirrors = 'true';
    else
        mirrors = 'false';

    var url = urlRoot + 'Sprint.svc/getstats/' + $('#division').val() + '/' + ($('#lowerTV').val() / 10) + '/' + ($('#higherTV').val() / 10) +
        '/' + mirrors + '/' + $('#ruleset').val() + '/' + $('#maxGames').val() + '/' + $('#gameDiff').val(); 
    //var url = urlRoot + 'Sprint.svc/getstats/' + ($('#lowerTV').val() / 10) + '/' + ($('#higherTV').val() / 10) + '/' + ($('#mirrors').checked ? "1" : "0") + '?callback=?';
    //var url = urlRoot + 'Sprint.svc/getstats/10/1000/0';
 
     
                
          //     alert(url);
    var n = 0;
  
    starting();
    $.ajax({ url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpcallback',
        success: function (data) {
           
            
            ending();
           
            jQuery("#list2").clearGridData(true);

            $(data).each(function (key, val) {
                jQuery("#list2").addRowData(n + 1, data[n]);
                n = n + 1;
            });
            //jQuery("#list2")[0].rowNum = n;
        }
    });
       
    //var url = 'http://localhost:1998/Sprint.svc/getsprint/' + $("#ddSprint option:selected").val() + '?method=?';
    //var url = 'http://94.236.9.52/fumbblservice/Sprint.svc/getsprintdetails/' + $("#ddSprint option:selected").val() + '?method=?';

    //get sprint details
   /* $.getJSON(url,
         function(data) {
         
                 data.Push();


          });  
*/

}
/*
function jsonpcallback(data) {

    alert(data);
    jQuery("#list2").clearGridData(true);

    $(data).each(function (key, val) {
        jQuery("#list2").addRowData(n + 1, data[n]);
        n = n + 1;
    });

}*/


function is_int(value){
   for (i = 0 ; i < value.length ; i++) {
      if ((value.charAt(i) < '0') || (value.charAt(i) > '9')) return false 
    }
   return true;
}


function formatJSONDatetime(jsonDate) {
    jsonDate = eval(jsonDate.replace(/\/Date\((.*?)\)\//gi, "new Date($1)"));


    return jsonDate.getDate() + '/' + (jsonDate.getMonth() + 1) + '/' + jsonDate.getFullYear() + ' ' + jsonDate.getHours() + ':' + jsonDate.getMinutes();

}



function formatJSONDate(jsonDate) {
    jsonDate = eval(jsonDate.replace(/\/Date\((.*?)\)\//gi, "new Date($1)"));


    return jsonDate.getDate() + '/' + (jsonDate.getMonth() + 1) + '/' + jsonDate.getFullYear();

}


function formatJSONDateminus(jsonDate) {
    jsonDate = eval(jsonDate.replace(/\/Date\((.*?)\)\//gi, "new Date($1)"));

    jsonDate.setDate(jsonDate.getDate() - 1);
    return jsonDate.getDate() + '/' + (jsonDate.getMonth() + 1) + '/' + jsonDate.getFullYear();

}