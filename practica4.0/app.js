
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var pg = require('pg');

var app = express();


var dbparams = {
    host : 'localhost',
    user : 'root',
    password : 'juanma00',
    database : 'nombre_db',
};
var dbUrl = "pg://postgres:juanma00@localhost:5432/velocity";
var client = new pg.Client(dbUrl);
client.connect();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var query = client.query("SELECT * FROM BUS");

query.on("row", function (row, result) {
    result.addRow(row);
});

query.on("end", function (result) {
    var json_string = JSON.stringify(result.rows, null, "    ");
    var json_object = JSON.parse(json_string);
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
    console.log("id de bus: "+json_object[9].bus + " tipo: " + json_object[9].tipo_bus);
});
