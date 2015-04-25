//var socket = io.connect(); 
function loguear(){
var us = document.getElementById("txt_usuario");
var pass = document.getElementById("txt_password");
if(us=="admin" && pass=="admin"){
res.render('administracion', { title: 'Express' });
alert("es admin");
}else{
alert("no es admin");
}
}
