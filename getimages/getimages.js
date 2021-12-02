var fs = require('fs'),
    request = require('request');

    var imageRoot = "C:\\vsprojs\\Fumbbl\\images\\";



function getimage() {
    request({
      url : 'https://fumbbl.com/i/676478',
      //make the returned body a Buffer
      encoding : null
  }, function(error, res, body) {

    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    console.log('Content-Disposition:', res.headers['Content-Disposition']);
      //will be true, body is Buffer( http://nodejs.org/api/buffer.html )
      console.log(body instanceof Buffer);

      //do what you want with body
      //like writing the buffer to a file
      fs.writeFile(imageRoot + 'xxx.png', body, {
          encoding : null
      }, function(err) {

          if (err)
              throw err;
          console.log('It\'s saved!');
      });

  });

}

getimage();



/*
var download = function(uri, filenameRoot, callback){
  console.log(uri);
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    console.log('Content-Disposition:', res.headers['Content-Disposition']);

    let filename = filenameRoot = res.headers['Content-Disposition'];

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://fumbbl.com/i/676478', imageRoot , function(){
  console.log('done');
});

*/