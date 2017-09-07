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

var dias=7;
var cleared=0;
var page='campanas';
var searched=0;
var search=0;
var stringSearch;
var inicioTouch, finTouch;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//        deviceReadyM();
    },


    onDeviceReady: function() {
        deviceReadyM();
    }
};

app.initialize();

//////////////////START////////////////////////////
function deviceReadyM() {
//    console.log(localStorage.getItem("nuevo")==null);

    StatusBar.backgroundColorByName("blue");
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { 
//            $body.removeClass("loading"); 
        }
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
    if(searched==0){
        $("#mainHeader").addClass("hidden");
        $("#outSer").addClass("hidden");
        $("#searchHeader").removeClass("hidden");
        $("#inputSearch").focus();
    }
});
//   $('#searcherCamp1').click(function(e) {
//    var str=$('#inputSearch').val();
//
//        searchCampanas(str);
//       $("#searchHeader").addClass("hidden");
//       $("#mainHeader").removeClass("hidden");
//        searched=1;
//        $("#test").focus();
//});
  
}


$('#inputSearch').bind("keypress", function(e){
   // enter key code is 13
   if(e.which === 13){
     var str=$('#inputSearch').val();
       
//       console.log(str);
        searchCampanas(str);
       $("#searchHeader").addClass("hidden");
       $("#mainHeader").removeClass("hidden");
        searched=0;
        $("#test").focus();
    } 
})


$('#clearSearch').click(function(e) {

       $("#subheader").addClass("hidden");
       $("#mainHeader").removeClass("hidden");
       $("#searchHeader").addClass("hidden");
       $("#outSer").removeClass("hidden");
       $("#dashDays").removeClass("hidden");
        
    $("#test").focus();
    $('#inputSearch').val('');
    searched=0;
    cargarCampanas();
        });

$('#backSearch').click(function(e) {

       $("#subheader").addClass("hidden");
       $("#mainHeader").removeClass("hidden");
       $("#searchHeader").addClass("hidden");
       $("#outSer").removeClass("hidden");
       $("#dashDays").removeClass("hidden");
        
    $("#test").focus();
    $('#inputSearch').val('');
    searched=0;
    cargarCampanas();
        });


function onBackKeyDown() {
        location.replace('./dashboard.html');
    }

var clicks=0;
     $('#dashDays').click(function(e) {
         
         $("body").addClass("loading");
         $("#auxC").addClass("hidden");
         if( clicks==0){
             
            $("#btnDashDay").html('30 dias');
             clicks=1;
             dias=30;
//             printCampanas(30);
             }else if( clicks==1){
                 
    $ ("#btnDashDay").html('90 dias');
             clicks=2;
                 dias=90;
//             printCampanas(90);
             }else if( clicks==2){
                 
    $("#btnDashDay").html('365 dias');
             clicks=3;
                 dias=365;
//             printCampanas(365);
                 
             }else if( clicks==3){
    $("#btnDashDay").html('7 dias');
             clicks=0;
             dias=7;
                 
             }
         
         
             e.preventDefault();
         printCampanas(dias);
    });

//////////////////////////////////




//On Bottom
//$(window).scroll(function() {
//   if($(window).scrollTop() + $(window).height() == $(document).height()) {
//       // Handle the swipe action
//    document.body.addEventListener('touchstart', function(e){
//        guardarIni(e.changedTouches[0].pageY);
//    }, false);
//    document.body.addEventListener('touchend', function(e){
//        guardarFin(e.changedTouches[0].pageY);
//    }, false);
//       
//   }
//});

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


//////
var search=0;
var contCampMost=1;
//$(document).ready(function() {
function inicioCampanas(){
 loadWizzard();
    myPag=1;
    
    
    x=localStorage.getItem("token");
    
    permissions=localStorage.getItem("permissions");
    
    

    b=localStorage.getItem("usrAuxMeu");
    language=localStorage.getItem("language");
    first=localStorage.getItem("first_name");
    last=localStorage.getItem("last_name");
    //actualizacion de los datos del menu
    usMail[0].first=first;
    usMail[0].last=last;
    usMail[0].mail=b;
    usMail[0].language=language;
    
        a=localStorage.getItem("dmdsId");
    c=localStorage.getItem("dmdsName");
    z=localStorage.getItem("groupId");
    y=localStorage.getItem("groupName");
        
    localStorage.idDmDsSel = a;
    localStorage.nameDmDsSel = c;
    localStorage.idGroupSel = z;
    localStorage.nameGroupSel = y;

    
//    console.log(b);
//    $('#userName').html(b);
    $('#h2p1').html("<br />Lista de Campañas: '"+c+"'");
    
//    console.log("Tu token es: "+x);
    cargarCampanas();
    
    
    
}


function gotoStats2(id,name){
    
        console.log('id '+id);
        campanaId=id;
        localStorage.campanaId=campanaId;
        localStorage.campanaName=name;
    
    location.replace('./statsC.html');
}

//function cargarMas(){
//    var ajx;
//    var aux=contCampMost*6;
//    console.log(totalCampanas);
//    if(aux<=totalCampanas){
//    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'created_at','orderDir':'desc','start':aux,'pagina':0};
//    wiz.processPerfil(obj);
//
//    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,'order_dir':wiz.Perfil[0].info.orderDir};
//    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);
//    contCampMost++;
//        
//    }
//}
    
    
function cargarCampanas(){
    var ajx
    search=0;
    var obj={'userEmail': b,'token': x,'language':language,'numReg':99,'Orderby':'last_activity','orderDir':'desc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);

}




function printCampanas(dias){

    var algo=0;
    if(dias==365){
        dias=9999999;
    }
    campanas.splice(0, campanas.length);
    
    
	if(typeof pag === "undefined") {
        pag = 0;
    console.log(JSON.stringify(wiz.Campanas[0]));
    }
        
        
        for(i=0;i<=wiz.Campanas.length-1;i++){
            var a = moment(wiz.Campanas[i].info.last_activity);
        var now = moment();
        var auxx=now.diff(a, 'days');
            console.log(auxx);
            if(auxx<=dias){
            campanas.push(wiz.Campanas[i]);
                algo++;
            }
        }
    
    console.log(wiz.Campanas.length);
    console.log(algo);
    if(algo==0){
//    $("#btnDashDay").mouseleave();
        $("#auxC").removeClass("hidden");
        $("#auxC").html('No hay campañas que contengan envíos en los ultimos '+dias+' dias.');
        $(".main").removeClass("hidden");
        
    }else{
        $("#auxC").addClass("hidden");
        $(".main").removeClass("hidden");
    }
    
    
    
    if(cleared==0){
        $("#askSearch").removeClass("hidden");
    }else if(cleared==1){
        $("#askSearch").addClass("hidden");
    }
    $("body").removeClass("loading");
}

function printCamp(){

    
    campanas.splice(0, campanas.length);
    
    
	if(typeof pag === "undefined") {
        pag = 0;
    console.log(JSON.stringify(wiz.Campanas[0]));
    }
        
        
        for(i=0;i<=wiz.Campanas.length-1;i++){
            
            campanas.push(wiz.Campanas[i]);
      
        }
    
//    if(cleared==0){
//        $("#askSearch").removeClass("hidden");
//    }else if(cleared==1){
//        $("#askSearch").addClass("hidden");
//    }
    
    
    if(searched==1){
        $("#askSearch").html('Hay '+totalCampanas+' resultados para "'+stringSearch+'".');
   $("#subheader").removeClass("hidden"); 
    }
   
   $("body").removeClass("loading");
}



function changeOrderCamp(){

    var e = document.getElementById("orderByCamp");
    var tt = e.options[e.selectedIndex].value;
    wiz.Perfil[0].info.Orderby=tt;
    var xx=$('#checkboxCamp').checked;
    if(xx){
        wiz.Perfil[0].info.orderDir='asc';
    }else{
        wiz.Perfil[0].info.orderDir='desc';
    }

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);
}


function searchCampanas(str){
    
    $("body").addClass("loading");
    stringSearch=str;
    cleared=0;
    var ajx;
    var search=1;
    //    var str = $('#inputSearch').val();
    var obj={'userEmail': b,'token': x,'language':language,'numReg':50,'Orderby':'last_activity','orderDir':'desc','start':0,'pagina':0};
    wiz.processPerfil(obj)
    
    
//    if(str==''){
//        var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
//    }else{
       var data={'search':str,'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir}; 
//    }


    
    for(i=0;i<=wiz.Campanas.length-1;i++){
            campanas.shift();
        }
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCamp);
}






//////////////IMPRESION DEL PERFIL UNA VEZ GUARDADO COMO OBJETO EN EL WIZ////////////
function printPerfil(){
    console.log(wiz.Perfil);
}
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
