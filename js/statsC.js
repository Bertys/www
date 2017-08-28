var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        deviceReadyM();
    }
};

app.initialize();


var page='campanasStats';
var campId, campName;
//////////////////START////////////////////////////
function deviceReadyM() {
    
    
    
    
    loadWizzard();

    
    
    x=localStorage.getItem("token");
    b=localStorage.getItem("userEmail");
    permissions=localStorage.getItem("permissions");
    language=localStorage.getItem("language");
    

      z=28;
      a=14;
      y='Default';
      c='PLANISYS Production';
        
    localStorage.idDmDsSel = a;
    localStorage.nameDmDsSel = c;
    localStorage.idGroupSel = z;
    localStorage.nameGroupSel = y;
    campId = localStorage.campanaId;
    campName = localStorage.campanaName;
    
    document.addEventListener("backbutton", onBackKeyDown, false);

    
//    console.log(b);
    $('#userName').html(b);
    $('#h2p7').html("<br />Campaña: '"+campName+"'");
    $('#h2p8').html("<br />Campaña: '"+campName+"'");
    
    
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
//        ajaxStop: function() {  }
        });
    
    
    
//    console.log("Tu token es: "+x);
    startEnvios();

    listenerEnvios();
    

}

var ajx
function startEnvios(){

    var obj={'userEmail': c,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+campId,data,wiz.processEnvios);
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


function inicioStatsCamp(){
//    console.log(JSON.stringify(wiz.enviosTot.info.totalEnvios));
    console.log(JSON.stringify(wiz.enviosTot[0].info));
    $('#xEnvios').html(wiz.enviosTot[0].info.totalEnvios +' Envíos');
    $('#totEma').html(wiz.enviosTot[0].info.ev_envio);
    $('#apTot').html(wiz.enviosTot[0].info.ev_vista);
    $('#apTotP').html((wiz.enviosTot[0].info.ev_vista/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    $('#apUni').html(wiz.enviosTot[0].info.ev_vista_unica);
    $('#apUniP').html((wiz.enviosTot[0].info.ev_vista_unica/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    $('#clTot').html(wiz.enviosTot[0].info.ev_click);
    $('#clTotP').html((wiz.enviosTot[0].info.ev_click/wiz.enviosTot[0].info.ev_vista*100).toFixed(2)+'%');
    $('#clUni').html(wiz.enviosTot[0].info.ev_click_unico);
    $('#clUniP').html((wiz.enviosTot[0].info.ev_click_unico/wiz.enviosTot[0].info.ev_vista*100).toFixed(2)+'%');
    $('#reTot').html(wiz.enviosTot[0].info.ev_rebote);
    $('#reTotP').html((wiz.enviosTot[0].info.ev_rebote/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    $('#reUni').html(wiz.enviosTot[0].info.ev_rebote_unico);
    $('#reUniP').html((wiz.enviosTot[0].info.ev_rebote_unico/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    $('#desTot').html(wiz.enviosTot[0].info.ev_desuscripcion);
    $('#desTotP').html((wiz.enviosTot[0].info.ev_desuscripcion/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    
    
    
    $(".main").removeClass("hidden");
    $body.removeClass("loading");
}

// Handle the back button
function onBackKeyDown() {
    location.replace('./campanas.html');
    }

function listenerEnvios(){

    $('#anavCampanas').click(function(e) {
      location.replace('./campanas.html');
        });
    
    $('#aCampanas').click(function(e) {
      location.replace('./campanas.html');
        });
    
        $('#aDashboard').click(function(e) {
    location.replace('./dashboard.html');
        });

}

function searchEnvios(str){

//    var str = $('.input-searchbox').val();

     
    for(i=0;i<=wiz.envios.length;i++){
            envios.shift();
        }
//    alert(str);
    var data={'search':str,'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
}

function cargarMasE(){
    var ajx;
    var aux=contEnvMost*6;
    if(aux<=totalEnvios){
        console.log(aux);
    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':aux,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
    contEnvMost++;
    }else{
//        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
}

function printEnvios(pag){
	if(typeof pag === "undefined"){
        pag = 0;
    console.log(wiz.envios);
 for(i=0;i<=wiz.envios.length-1;i++){
            envios.push(wiz.envios[i]);
        }
    if(wiz.envios.length==0){
        envios.push({info:{envio:{nombre:"El envío seleccionado no tiene correos."},id:0}})
        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
	}
//    else{
//        wiz.Perfil[0].info.pagina=pag;
//        var start=wiz.Perfil[0].info.pagina*wiz.Perfil[0].info.numReg;
//        var data={'start' : start, 'length' : wiz.Perfil[0].info.numReg, 'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
//        ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+b,data,wiz.processEnvios);
//    }

    if(totalEnvios<=6){
//        document.getElementById('butCarMasE').setAttribute('disabled', true);
    }
}
function gotoStats3(id,nombre) {
    localStorage.envioId=id;
        localStorage.envioName=nombre;
    location.replace('./statsE.html');
        }

$('#searcherEnvios').click(function(e) {
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
    cargarMasE();
        }
}

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
});
