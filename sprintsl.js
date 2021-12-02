// we will add our javascript code here

var logo;
var maxs;
//var urlRoot = 'http://213.251.18.165/fumbblservice5/';
var urlRoot = 'https://qa.compasssearch.co.uk/fumbblservice5/';




$(document).ready(function() {

    $('#getSprint').click(getSprint);
    $('#ddSprint').change(sprintChange);
    $('#ddRace').change(getSprint);

    var sprintId = $.query.get('sprintId');

    //alert(sprintId);

    if (sprintId != "") {
        $("#ddSprint").val(sprintId);
    } else {
        $("#ddSprint").val(34);
    }


    sprintSet();
});

function sprintChange() {
    var sprintId = $("#ddSprint option:selected").val();

    if (sprintId == 8 || sprintId == 9 || sprintId == 2 || sprintId == 3 || sprintId == 12 || sprintId == 13 || sprintId == 18 || sprintId == 22) {
        $("#ddRace").val(9);
        $("#ddRace").attr("disabled", true);
    }
    else {
        $("#ddRace").val(-1);
        $("#ddRace").attr("disabled", false);

    }
        
    getSprint();
}

function sprintSet() {
    var sprintId = $("#ddSprint option:selected").val();
    var raceId = $.query.get('raceId');



    if (sprintId == 8 || sprintId == 9 || sprintId == 2 || sprintId == 3 || sprintId == 12 || sprintId == 13 || sprintId == 18 || sprintId == 22) {
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

    getSprint();
}

function getSprint() {



    //var url = urlRoot + 'Sprint.svc/getsprintdetails/' + $("#ddSprint option:selected").val() + '?method=?';
    var url = urlRoot + 'Sprint.svc/getsprintdetails/' + $("#ddSprint option:selected").val();

    //alert(url);
    //get sprint details
    //$.getJSON(url,
    starting();
    $.ajax({ url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpcallback',
        success: function (data) {
            //alert('2');
            logo = $("#imgLogo");
            // alert(data["ImageUrl"]);
            $(logo).attr("src", data["ImageUrl"]);
            $("#defaultcss").attr("href", data["CssUrl"]);
            $("#h2Head").text(data["Name"]);
            document.title = data["Name"];
            $("#tdMessage").text(data["Message"]);
            $("#h2Head").text(data["Name"]);
            $("#spWin").text(data["PtsWin"]);
            $("#spDraw").text(data["PtsDraw"]);
            $("#spLoss").text(data["PtsLose"]);
            $("#spUpdated").text(formatJSONDatetime(data["UpdatedDate"]));
            $("#spFromDate").text(formatJSONDate(data["StartDate"]));
            $("#spToDate").text(formatJSONDateminus(data["EndDate"]));


            //url = urlRoot + 'Sprint.svc/getsprintmax/' + $("#ddSprint option:selected").val() + '/' + $("#ddRace option:selected").val()  + '?method=?';
            url = urlRoot + 'Sprint.svc/getsprintmax/' + $("#ddSprint option:selected").val() + '/' + $("#ddRace option:selected").val();

            //get highest vales
            //$.getJSON(url,
            $.ajax({ url: url,
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'jsonpcallback',
                success:
                function (data) {

                    maxs = data;



                    var tst5 = maxs.TD;
                    //alert(maxs);
                    //url = urlRoot + 'Sprint.svc/getsprintrace/' + $("#ddSprint option:selected").val() + '/' + $("#ddRace option:selected").val() + '?method=?';
                    url = urlRoot + 'Sprint.svc/getsprintrace/' + $("#ddSprint option:selected").val() + '/' + $("#ddRace option:selected").val();
                    //$.getJSON(url,
                    $.ajax({ url: url,
                        dataType: 'jsonp',
                        jsonp: 'callback',
                        jsonpCallback: 'jsonpcallback',
                        success:
                                        function (data) {
                                            //alert('2');


                                            var table = $("#tblGrid");
                                            table.html("");  //clear out the table if it was previously populated
                                            //eval("var data = " + tableData);  //load the data variable as an object array

                                            table.append('<thead><tr></tr></thead>');

                                            var tr = $('tr:last', table);
                                            //tr.append('<th></th><th>Team</th><th>Coach</th><th>Race</th><th align="center">Played</th><th align="center">Win</th><th align="center">Draw</th><th align="center">Loss</th><th align="center">Points</th><th align="center">TV Avg</th>');
                                            tr.append('<th scope="col"> </th><th scope="col">Team</th><th scope="col">Coach</th><th scope="col">Race</th><th scope="col">Played</th><th scope="col">Win</th>');
                                            //tr.append('<th scope="col">Draw</th><th scope="col">Loss</th><th scope="col">Record</th><th scope="col">TDF</th><th scope="col">TDA</th><th scope="col">CasF</th><th scope="col">CasA</th><th scope="col">Points</th><th scope="col">TV Avg</th><th class=\"hidden-phone  hidden-tablet\">%</th>'); 
                                            tr.append('<th scope="col">Draw</th><th scope="col">Loss</th><th scope="col">TDF</th><th scope="col">TDA</th><th scope="col">CasF</th><th scope="col">CasA</th><th scope="col">Points</th><th scope="col">TV Avg</th>');

                                            $(data).each(function (key, val) {

                                                table.append('<tr></tr>');


                                                tr = $('tr:last', table);

                                                tr.append('<td data-title="#">' + (key + 1) + '</td>');  //1
                                                tr.append('<td data-title="Team"><a href="resultssl.html?sprintId=' + $("#ddSprint option:selected").val() + '&teamId=' + val['TeamId'] + '">' + val['TeamName'] + '</a></td>');  //2
                                                tr.append('<td data-title="Coach"><a href="http://fumbbl.com/~' + val['CoachName'] + '">' + val['CoachName'] + '</a></td>');  //3
                                                tr.append('<td data-title="Race"><a href="sprintsl.html?sprintId=' + $("#ddSprint option:selected").val() + '&raceId=' + val['RaceId'] + '">' + val['RaceName'] + '</a></td>'); //4
                                                tr.append('<td align="center" data-title="Played">' + val['Played'] + '</td>');  //5
                                                tr.append('<td align="center" data-title="Win">' + val['Win'] + '</td>'); //6
                                                tr.append('<td align="center" data-title="Draw">' + val['Draw'] + '</td>');  //7
                                                tr.append('<td align="center" data-title="Lose">' + val['Lose'] + '</td>');  //8
                                           //     tr.append('<td  data-title="Record">' + val['Win'] + '/' + val['Draw'] + '/' + val['Lose'] + '</td>');  //9

                                                if (maxs.TD == val['TDF'])   //10
                                                    tr.append('<td align="center" class="leader">' + val['TDF'] + '</td>');
                                                else
                                                    tr.append('<td align="center">' + val['TDF'] + '</td>');
                                                tr.append('<td align="center">' + val['TDA'] + '</td>');  //11

                                                if (maxs.CasF == val['CasF'])  //12
                                                    tr.append('<td align="center" class="leader">' + val['CasF'] + '</td>');
                                                else
                                                    tr.append('<td align="center">' + val['CasF'] + '</td>');

                                                if (maxs.CasA == val['CasA'])  //13
                                                    tr.append('<td align="center" class="leader hidden-phone">' + val['CasA'] + '</td>');
                                                else
                                                    tr.append('<td align="center"class="hidden-phone" >' + val['CasA'] + '</td>');
                                                tr.append('<td align="center" class="leader" data-title="Points">' + val['Points'] + '</td>');  //14
                                                tr.append('<td align="center" data-title="TVavg">' + val['TVavg'].toFixed(2) + '</td>');  //15
                                           //     tr.append('<td align="center" class="hidden-phone hidden-tablet" data-title="%">' + val['DisplayPercentage'].toFixed(2) + '</td>');  //16
                                            })
                                            ending();
                                        },
                        error: function () {
                            ending();
                        }
                    });
                    /*      .success(function() { alert("second success"); })
                    .error(function() { alert("error"); })
                    .complete(function() { alert("complete"); })*/
                    ;

                } 
            });



        } 
    });   //sprint details


}



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
