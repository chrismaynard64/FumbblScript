// we will add our javascript code here

var logo;
//var urlRoot = 'http://localhost:1998/';
//var urlRoot = 'http://213.251.18.165/fumbblservice/';
var urlRoot = 'https://qa.compasssearch.co.uk/fumbblservice5/';


$(document).ready(function() {

    $.ajaxSetup({
        // Add a custom converter to convert ASP.NET JSON dates to JS Date object
        // That is convert { "\/Date(...)\/" } to { new Date(...) }
        converters: {
            "text json": function(textValue) {
                return jQuery.parseJSON(textValue.replace(/"\\\/Date\((-?\d*)\)\\\/"/g, "new Date($1)"));
            }
        }
    });


    getResults();
});

function getResults() {

    var type = $.query.get('type');
    var sprintId = $.query.get('sprintId');
    var teamId = $.query.get('teamId');


    if (sprintId == null || sprintId == '')
        sprintId = 10;

        var url = urlRoot + 'Sprint.svc/getsprintdetails/' + sprintId;
       // var url = urlRoot + 'Sprint.svc/getsprintdetails/' + sprintId + '?method=?';
        //var url = 'http://94.236.9.52/fumbblservice/Sprint.svc/getsprintdetails/' + $("#ddSprint option:selected").val() + '?method=?';

    $.ajax({ url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpcallback',
        success:
             function(data) {
                 //alert('2');
                 logo = $("#imgLogo");
                 // alert(data["ImageUrl"]);
                 $(logo).attr("src", data["ImageUrl"]);
                 $("link").attr("href", data["CssUrl"]);
                 $("#h2Head").text(data["Name"]);
                 document.title = data["Name"];

                 //url = 'http://94.236.9.52/fumbblservicerace/Sprint.svc/getsprint/' + $("#ddSprint option:selected").val() + '&' + $("#ddRace option:selected").val() + '?method=?';
                 if (type == "big") {
                     url = urlRoot + 'Sprint.svc/getbigmatches/' + sprintId;
                     $("#h3Head").text("Big Games");
                 } else {
                     url = urlRoot + 'Sprint.svc/gethumanmatches/10';
                     $("#h3Head").text("Human Glories");
                 }
                // alert(url);

                $.ajax({ url: url,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'jsonpcallback',
                    success:
                            function(data) {
                                //alert('2');


                                var table = $("#tblGrid");
                                table.html("");  //clear out the table if it was previously populated
                                //eval("var data = " + tableData);  //load the data variable as an object array


                                var tr = $('tr:last', table);

                                $(data).each(function(key, val) {
                                    table.append('<tr></tr>');
                                    tr = $('tr:last', table);

                                    var date = formatJSONDate(val['MatchDate']);
                                    var hpos = "", apos = "";


                                    if (val['HomePosition'] != undefined)
                                        hpos = "(" + val['HomePosition'] + ")";
                                    if (val['AwayPosition'] != undefined)
                                        apos = "(" + val['AwayPosition'] + ")";
                                        
                                    tr.append('<td></td>');
                                    tr.append('<td align="right" colspan="3"><span title="Top 10 position">' + hpos + '</span> <a target="_blank" class="resultTeam" href="http://fumbbl.com/FUMBBL.php?page=team&amp;op=view&amp;team_id=' + val['HomeId'] + '">' + val['HomeTeam'] + '</a>&nbsp;</td>');
                                    tr.append('<td rowspan="2"></td>');
                                    tr.append('<td class="resultTeam">' + val['HomeTouchdowns'] + '</td><td>-</td><td class="resultTeam">' + val['AwayTouchdowns'] + '</td>');
                                    tr.append('<td rowspan="2"></td>');
                                    tr.append('<td align="left" colspan="3"><a target="_blank" class="resultTeam" href="http://fumbbl.com/FUMBBL.php?page=team&amp;op=view&amp;team_id=' + val['AwayId'] + '">' + val['AwayTeam'] + '</a> <span title="Top 10 position">' + apos + '</sprint></td>');
                                    tr.append('<td>&nbsp;</td><td>' + date + '</td>');
                                    tr.append('<td></td>');


                                    // alert(val['MatchDate'].substr(6));

                                    //var dt = new Date(parseInt(val['MatchDate'].substr(6)));
                                    //alert(dt);

                                    //tr.append('<td>' + dt + '</td>');
                                    //alert(val['MatchDate'].getDate());
                                    table.append('<tr></tr>');
                                    tr = $('tr:last', table);



                                    // date = eval(date.replace(/\/Date\((.*?)\)\//gi, "new Date($1)"));

                                    //var date = new Date(val['MatchDate']replace(/\/Date\((\d+)\)\//, '$1'));

                                    tr.append('<td></td>');
                                    tr.append('<td align="left"><a target="_blank" href="http://fumbbl.com/~' + val['HomeCoach'] + '">' + val['HomeCoach'] + '</a>');
                                    tr.append('<td align="center"><span title="BH/SI/RIP">' + val['HomeBH'] + '/' + val['HomeSI'] + '/' + val['HomeRIP'] + '</span></td>');
                                    tr.append('<td align="right">' + val['HomeRace'] + '(' + val['HomeRating'] + ')</td>');
                                    tr.append('<td align="center" colspan="3">[' + val['DivisionCode'] + ']</td>');
                                    tr.append('<td align="left">' + val['AwayRace'] + '(' + val['AwayRating'] + ')</td>');
                                    tr.append('<td align="center"><span title="BH/SI/RIP">' + val['AwayBH'] + '/' + val['AwaySI'] + '/' + val['AwayRIP'] + '</span></td>');
                                    tr.append('<td align="right"><a target="_blank" href="http://fumbbl.com/~' + val['AwayCoach'] + '">' + val['AwayCoach'] + '</a>');
                                    tr.append('<td>&nbsp;</td><td><a target="_blank" href="http://fumbbl.com/FUMBBL.php?page=match&id=' + val['MatchId'] + '">Report / Replay</a></td>');


                                    table.append('<tr></tr>');
                                    tr = $('tr:last', table);
                                    tr.append('<td colspan="14"><hr size="1" /></td>');

                                });


                            }
                        })

             }
            })
    /*      .success(function() { alert("second success"); })
    .error(function() { alert("error"); })
    .complete(function() { alert("complete"); })*/;





}




function formatJSONDate(jsonDate) {
    jsonDate = eval(jsonDate.replace(/\/Date\((.*?)\)\//gi, "new Date($1)"));


    return jsonDate.getDate() + '/' + (jsonDate.getMonth() + 1) + '/' + jsonDate.getFullYear();

}
