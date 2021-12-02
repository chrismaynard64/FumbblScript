var fs = require('fs'),
    request = require('request');

    var imageRoot = "C:\vsprojs\\Fumbbl\\images\\";

var download = function(uri, filenameRoot, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    console.log('content-length:', res.headers['Content-Disposition']);

    let filename = filenameRoot = res.headers['Content-Disposition'];

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://fumbbl.com/i/676478', imageRoot , function(){
  console.log('done');
});