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

var stringSearch;
var searched=0;
var page='campanasStats';
var campId, campName,a,b,c,d,x,y,z,permissions,language,name,nameG;
//////////////////START////////////////////////////
function deviceReadyM() {

    
    loadWizzard();

    
    
    x=localStorage.getItem("token");
    
    permissions=localStorage.getItem("permissions");
    
    
    b=localStorage.getItem("usrAuxMeu");
    language=localStorage.getItem("language");
    first=localStorage.getItem("first_name");
    last=localStorage.getItem("last_name");
//  //actualizacion de los datos del menu
    usMail[0].first=first;
    usMail[0].last=last;
    usMail[0].mail=b;
    usMail[0].language=language;
        
        a=localStorage.getItem("dmdsId");
    name=localStorage.getItem("dmdsName");
    z=localStorage.getItem("groupId");
    nameG=localStorage.getItem("groupName");
    

    campId = localStorage.campanaId;
    campName = localStorage.campanaName;
    
    document.addEventListener("backbutton", onBackKeyDown, false);

    
    console.log(b,a,z,campId);
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

//    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    var data={"start":wiz.Perfil[0].info.start,"length":wiz.Perfil[0].info.numReg,"order_by":wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir}; 
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
    
     var res1,res2,res3,res4,res5,res6,res7;

//    console.log(JSON.stringify(wiz.enviosTot.info.totalEnvios));
    console.log(JSON.stringify(wiz.enviosTot[0].info));
    $('#xEnvios').html(wiz.enviosTot[0].info.totalEnvios +' Envíos');
    $('#totEma').html(wiz.enviosTot[0].info.ev_envio);
    
    $('#apTot').html(wiz.enviosTot[0].info.ev_vista);
    if((wiz.enviosTot[0].info.ev_vista/wiz.enviosTot[0].info.ev_envio*100).toFixed(0)>=100){
        res1='100%'
        }else{ res1=(wiz.enviosTot[0].info.ev_vista/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%'}
    $('#apTotP').html(res1);
    $("#apTotPp .md-progress-track").css("width", (wiz.enviosTot[0].info.ev_vista/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    
    $('#apUni').html(wiz.enviosTot[0].info.ev_vista_unica);
    if((wiz.enviosTot[0].info.ev_vista_unica/wiz.enviosTot[0].info.ev_envio*100).toFixed(0)>=100){
        res2='100%'
        }else{ res2=(wiz.enviosTot[0].info.ev_vista_unica/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%'}
    $('#apUniP').html(res2);
    $("#apUniPp .md-progress-track").css("width", (wiz.enviosTot[0].info.ev_vista_unica/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    
    $('#clTot').html(wiz.enviosTot[0].info.ev_click);
    if((wiz.enviosTot[0].info.ev_click/wiz.enviosTot[0].info.ev_vista*100).toFixed(0)>=100){
        res3='100%'
        }else{ res3=(wiz.enviosTot[0].info.ev_click/wiz.enviosTot[0].info.ev_vista*100).toFixed(2)+'%'}
    $('#clTotP').html(res3);
    $("#clTotPp .md-progress-track").css("width", (wiz.enviosTot[0].info.ev_click/wiz.enviosTot[0].info.ev_vista*100).toFixed(2)+'%');
    
    $('#clUni').html(wiz.enviosTot[0].info.ev_click_unico);
    if((wiz.enviosTot[0].info.ev_click_unico/wiz.enviosTot[0].info.ev_vista*100).toFixed(0)>=100){
        res4='100%'
        }else{ res4=(wiz.enviosTot[0].info.ev_click_unico/wiz.enviosTot[0].info.ev_vista*100).toFixed(2)+'%'}
    $('#clUniP').html(res4);
    $("#clUniPp .md-progress-track").css("width", (wiz.enviosTot[0].info.ev_click_unico/wiz.enviosTot[0].info.ev_vista*100).toFixed(2)+'%');

    
//    $('#reTot').html(wiz.enviosTot[0].info.ev_rebote);
//    if((wiz.enviosTot[0].info.ev_click_unico/wiz.enviosTot[0].info.ev_vista*100).toFixed(0)>=100){
//        res5='100%'
//        }else{ res5=(wiz.enviosTot[0].info.ev_click_unico/wiz.enviosTot[0].info.ev_vista*100).toFixed(2)+'%'}
//    $('#reTotP').html(res5);
//    $("#reTotPp .md-progress-track").css("width", (wiz.enviosTot[0].info.ev_click_unico/wiz.enviosTot[0].info.ev_vista*100).toFixed(2)+'%');
//    $('#reTotP').html((wiz.enviosTot[0].info.ev_rebote/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
//    
    
    
    $('#reUni').html(wiz.enviosTot[0].info.ev_rebote_unico);
    if((wiz.enviosTot[0].info.ev_rebote_unico/wiz.enviosTot[0].info.ev_envio*100).toFixed(0)>=100){
        res6='100%'
        }else{ res6=(wiz.enviosTot[0].info.ev_rebote_unico/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%'}
    $('#reUniP').html(res6);
    $("#reUniPp .md-progress-track").css("width", (wiz.enviosTot[0].info.ev_rebote_unico/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    
    
    $('#desTot').html(wiz.enviosTot[0].info.ev_desuscripcion);
    if((wiz.enviosTot[0].info.ev_desuscripcion/wiz.enviosTot[0].info.ev_envio*100).toFixed(0)>=100){
        res7='100%'
        }else{ res7=(wiz.enviosTot[0].info.ev_desuscripcion/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%'}
    $('#desTotP').html(res7);
    $("#desTotPp .md-progress-track").css("width", (wiz.enviosTot[0].info.ev_desuscripcion/wiz.enviosTot[0].info.ev_envio*100).toFixed(2)+'%');
    
    
    
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
    
    $('#envios').click(function(e) {
      $("#searcherEnvios").removeClass("hidden");
        });

    $('#stats').click(function(e) {
      $("#searcherEnvios").addClass("hidden");
        });
    
    $('#searcherEnvios').click(function(e) {
    if(searched==0){
        $("#mainHeader").addClass("hidden");
        $("#searchHeader").removeClass("hidden");
        $("#inputSearch").focus();
    }
});
   $('#searcherEnv1').click(function(e) {
    var str=$('#inputSearch').val();
//       console.log(str);
     searchEnvios(str);
       $("#searchHeader").addClass("hidden");
       $("#mainHeader").removeClass("hidden");
        searched=1;
        $("#listaEnvios").focus();
});
    
}

function searchEnvios(str){

    stringSearch=str;
    var ajx;
    for(i=0;i<=wiz.envios.length;i++){
            envios.shift();
        }
    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'desc','start':0,'pagina':0};
    wiz.processPerfil(obj);
//    alert(str);
    var data={'search':str, 'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
//    var data={"search":str,"start":0,"length":6,"order_by":"id","order_dir":"asc"}; 
    ajx = wiz.postInfo('envios/'+a+'/'+z+'/'+campId,data,wiz.processEnvios);
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
//        document.getElementById('butCarMasE').setAttribute('disabled', true);
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
    
   if(searched==1){ 
    $("#askSearch").html('Hay '+totalEnvios+' resultados para "'+stringSearch+'".');
    $("#subheader").removeClass("hidden"); 
    }
   $body.removeClass("loading");
}
function gotoStats3(id,nombre) {
    localStorage.envioId=id;
        localStorage.envioName=nombre;
    location.replace('./statsE.html');
        }

//$('#searcherEnvios').click(function(e) {
//    if(searched==0){
//        $("#inputSearch").removeClass("hidden");
//        $("#inputSearch").focus();
//    }
//});

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
     var str=$('#inputSearch').val();
     searchEnvios(str);
      $("#searchHeader").addClass("hidden");
       $("#mainHeader").removeClass("hidden");
        searched=1;
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
    startEnvios();
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