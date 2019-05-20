
const http = require('http');

http.createServer(onrequest).listen(8000);

function onrequest(req, res){
  console.log('Aight');
  res.end(req + res);
}
