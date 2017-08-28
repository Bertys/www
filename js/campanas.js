//var superAdmin=true;
var language;
var myPag;
var userEmail;
var urlP;

var pregSec;
var resSec;
var idAuth;
var tokenAuth;
var pswAuth;
var pswRAuth;

var usrAuxMeu;
var pswAuxMeu;

var a,b,c,d,e,f,x,y,z;
var permissions,language;

var page='campanas';
var searched=0;
var inicioTouch, finTouch;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//        deviceReadyM();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
//        this.receivedEvent('deviceready');
        deviceReadyM();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

//////////////////START////////////////////////////
function deviceReadyM() {
//    console.log(localStorage.getItem("nuevo")==null);
    
    StatusBar.backgroundColorByName("blue");
    $("#campanas").removeClass("hidden");
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }
        });
    
        
    inicioCampanas();
     listenerCampanas();
    myPag=0;
//        language=getCookie('language');
        if(language==undefined){
            language='es';
        }

//        myScript(language,myPag);

        urlP=document.URL;


  
    
    
//console.log(languages.es[1].welcome);

        loadWizzard();


        window.onpopstate = function(event) {
            if(event && event.state) {
                location.reload();
            }
        }
}
/////////////////////////////////////
///////FINAL DEL DOCUMENT READY//////
/////////////////////////////////////


///////////////WIZARD////////////////
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
function afterLoad() {
    // code to execute
//    console.log('Se cargaron las cookies.');
}

function listenerCampanas(){
            $('#aDashboard').click(function(e) {
        location.replace('./dashboard.html');
        e.preventDefault();
    });


//////////CODIGO MIO ///////////
$('#goBack').click(function(e) {
    location.replace('./dashboard.html');
        });
$('#searcherCamp').click(function(e) {
//    location.replace('./searcher.html');
    //Aqui codigo de busqueda CAMP
    if(searched==0){
        $("#inputSearch").removeClass("hidden");
        $("#inputSearch").focus();
    }
});
   


// Handle the swipe action
    //
   
    document.body.addEventListener('touchstart', function(e){
//        alert(e.changedTouches[0].pageX) // alert pageX coordinate of touch point
        guardarIni(e.changedTouches[0].pageY);
        
    }, false);
    document.body.addEventListener('touchend', function(e){
//        alert(e.changedTouches[0].pageY) // alert pageX coordinate of touch point
        guardarFin(e.changedTouches[0].pageY);
    
    }, false);
    
}
function guardarIni(int){
    inicioTouch=int;
//    console.log(inicioTouch);
} 
function guardarFin(int){
    finTouch=int;
//    console.log(finTouch);
    comparar();
}    
function comparar(){
    if(inicioTouch>finTouch && (inicioTouch-finTouch)>230){
    cargarMas();
        }
}
function onBackKeyDown() {
        location.replace('./dashboard.html');
    }

var clicks=0;
     $('#btnDashDay').click(function(e) {
         if( clicks==0){
    $("#btnDashDay").html('30 dias');
             clicks=1;
             }else if( clicks==1){
    $("#btnDashDay").html('90 dias');
                 clicks=2;
             }else if( clicks==2){
    $("#btnDashDay").html('365 dias');
                 clicks=3;
             }else if( clicks==3){
    $("#btnDashDay").html('7 dias');
                 clicks=0;
             }
             e.preventDefault();
    });

//////////////////////////////////

$('#inputSearch').bind("keypress", function(e){
   // enter key code is 13
   if(e.which === 13){
     console.log("user pressed done");
     var str=$('#inputSearch').val();
     searchCampanas(str);
       $("#inputSearch").addClass("hidden");
//        searched=0;
        $("#test").focus();
    } 
})
