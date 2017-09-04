//var app = {
//    // Application Constructor
//    initialize: function() {
//        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//    },
//
//    // deviceready Event Handler
//    //
//    // Bind any cordova events here. Common events are:
//    // 'pause', 'resume', etc.
//    onDeviceReady: function() {
////        this.receivedEvent('deviceready');
//        deviceReadyM();
//    },
//
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};
//
//app.initialize();
$( document ).ready(function() {
            deviceReadyM();
});

//////////////////START////////////////////////////
function deviceReadyM() {

     $body = $("body");
     $main = $(".main");
    listenerLogin();
    loadWizzard();


  if(localStorage.getItem("nuevo")==null){
            console.log('entra nuevo=null');
        
        $body.removeClass("loading");
      $main.removeClass("hidden");

        }else if(localStorage.getItem("nuevo")=='Bueno'){
            startPageLogin(localStorage.getItem("usrAuxMeu"),localStorage.getItem("pswAuxMeu"));
        }else{
//            inicioCampanas();
            console.log('elese');
        }


        window.onpopstate = function(event) {
            if(event && event.state) {
                location.reload();
            }
        }


}
/////////////////////////////////////
///////FINAL DEL DOCUMENT READY//////
/////////////////////////////////////


//////////CODIGO MIO ////////////////


var token,email,first_name,language,last_name;
var permissions;
var nIntentos=0;

function listenerLogin(){

            $('#butLogin').click(function(e) {
        var user = $("#user").val();
        var password = $("#password").val();
        var passwordsha256 = CryptoJS.SHA256(password);
        var ppssww = passwordsha256.toString();
        startPageLogin(user,ppssww);
        userEmail=user;
//        document.cookie = "userEmail="+userEmail;
        e.preventDefault();
    });
}
function startPageLogin(usr,psw){

nIntentos++;

pswAuxMeu=psw;


    // Sending and receiving data in JSON format using POST mothod
var xhr = new XMLHttpRequest();
var url = "http://dmds-users-dev.planisys.net/api/v1/auth/login";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);

        token=json.token;
        permissions=JSON.stringify(json.permissions);
        language=json.lang;
        first_name=json.first_name;
        last_name=json.last_name;
        email=json.email;

        console.log("Te has logueado correctamente con: "+usr+" y tu token es: "+json.token);
        console.log('La respuesta del servidor ha sido:');
        console.log(JSON.stringify(json));

        localStorage.setItem("token", token);
        localStorage.setItem("permissions", permissions);
        localStorage.setItem("language", language);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
//        localStorage.setItem("usrAuxMeu", email);

        
        
            
        localStorage.setItem("nuevo", "Bueno");
        localStorage.setItem("usrAuxMeu", email);
        localStorage.setItem("pswAuxMeu", pswAuxMeu);

        location.replace('./choose.html');
        /*setTimeout(function(){
        }, 2000);*/

    }else if (xhr.readyState == 4 && xhr.status !== 200){
        console.log("Tu login es incorrecto, vuelve a intentarlo.");
        alert("Tu login es incorrecto, vuelve a intentarlo.");
        
        localStorage.removeItem('nuevo');
        location.replace('./index.html');

        }else{
            console.log("Entra login else. con: xhr.readyState "+xhr.readyState+' xhr.status '+xhr.status);
//        alert("Tu login es incorrecto, vuelve a intentarlo.");
        }
    //console.log(xhr.readyState +"/"+xhr.status);
}
var data = JSON.stringify({"username":usr,"password":psw});
xhr.send(data);

}
function getJson(json){
   console.log(json);
}

///////////////////////////////////////////////////////////////

//////Click login al presionar Enter ////////////
function runScript(e) {
    if (e.keyCode == 13) {
        var tb = document.getElementById("password");
        $( "#butLogin" ).trigger( "click" );
//        eval(tb.value);
        return false;
    }
}

function loadWizzard(){
	var str;
	if(str != undefined && str.length>2){
		var js = JSON.parse(str);
		wiz = new WizzardDMDS(js);
	} else{
		wiz = new WizzardDMDS();
	}
	if(typeof afterLoad !== "undefined") afterLoad();
	afterLoad = undefined;
    //console.log("afterloadwizard");
}
