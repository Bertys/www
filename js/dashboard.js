var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
       StatusBar.backgroundColorByName("orange"); 
    }
};

app.initialize();


$( document ).ready(function() {
            deviceReadyM();
});

var x,b,permissions,language,a,z,y,c,name, nameG;
//////////////////START////////////////////////////
function deviceReadyM() {


     loadWizzard();
        
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    x=localStorage.getItem("token");
    b=localStorage.getItem("usrAuxMeu");
    permissions=localStorage.getItem("permissions");
    language=localStorage.getItem("language");
    

    a=localStorage.getItem("dmdsId");
    name=localStorage.getItem("dmdsName");
    z=localStorage.getItem("groupId");
    nameG=localStorage.getItem("groupName");
      
    
//      z=28;
//      a=14;
      y='Default';
      c='Default';
        
//    localStorage.idDmDsSel = a;
//    localStorage.nameDmDsSel = c;
//    localStorage.idGroupSel = z;
//    localStorage.nameGroupSel = y;
    
    console.log(a);
    console.log(z);
    console.log(name);
    console.log(nameG);
    
    var auxil='<span>Hugo Planisys</span><div>'+b+'</div>';
    $('#userName').html(auxil);
     
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { 
//            $body.removeClass("loading");
//            $('.wrap').removeClass("hidden");
        }
        });
    

    listenerDashboard();
    
    var ajx;
    var obj={'userEmail': b,'token': x,'language':language,'numReg':50,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.getInfo('dashboard/'+a+'/'+z,null,wiz.processTotales);
    


    

        window.onpopstate = function(event) {
            if(event && event.state) {
                location.reload();
            }
        }
    

}
/////////////////////////////////////
///////FINAL DEL DOCUMENT READY//////
/////////////////////////////////////

function processTotals(){
    var d = new Date();
        var dias=7;
        var auxEnv=0;
        var auxEmails=0;
        var auxOR=0;
        var auxCR=0;
        console.log(wiz.Campanas[0].info.created_at);
        console.log(d);
        for(ii=0;ii<wiz.Campanas.length-1;ii++){
            
//            if(wiz.Campanas[ii].info.created_at<d){
            auxEnv+=wiz.Campanas[ii].info.stats.envios_hechos;
            auxEmails+=wiz.Campanas[ii].info.stats.emails_enviados;
            auxOR+=parseFloat(wiz.Campanas[ii].info.stats.open_rate);
            auxCR+=parseFloat(wiz.Campanas[ii].info.stats.click_rate);
        }
//        console.log('Total: Envios>'+auxEnv+' Emails>'+auxEmails+' OR>'+(auxOR/wiz.Campanas.length).toFixed(2)+'% CR>'+(auxCR/wiz.Campanas.length).toFixed(2)+'%');
//        alert('Total: Envios>'+auxEnv+' Emails>'+auxEmails+' OR>'+(auxOR/wiz.Campanas.length).toFixed(2)+'% CR>'+(auxCR/wiz.Campanas.length).toFixed(2)+'%');
//       }     
        
    
}



//////////CODIGO MIO ////////////////

var token;
var permissions;
var nIntentos=0;
var page='dashboard';

function listenerDashboard(){
            $('#aCampanas').click(function(e) {
        location.replace('./campanas.html');
        e.preventDefault();
    });
    var clicks=0;
     $('#dashDays').click(function(e) {
         if( clicks==0){
    $("#btnDashDay").html('30 dias');
             clicks=1;
             printStatsTotales('thirty');
             }else if( clicks==1){
    $("#btnDashDay").html('90 dias');
                 clicks=2;
                 printStatsTotales('ninety');
             }else if( clicks==2){
    $("#btnDashDay").html('365 dias');
                 clicks=3;
                 printStatsTotales('yearly');
             }else if( clicks==3){
    $("#btnDashDay").html('7 dias');
                 clicks=0;
                 printStatsTotales('seven');
             }
             e.preventDefault();
    });
    
    
    $('#aCampanas').click(function(e) {
        location.replace('./campanas.html');
        e.preventDefault();
    });
    
    
    
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

function printPerfil(){
    console.log(JSON.stringify(wiz.Perfil));
}

// Handle the back button
function onBackKeyDown() {
//    $('#dialog').click();
//    startlistenexit();
    location.replace('./login.html');
    }
function startlistenexit(){
    $('#closeapp').click(function(e) {
    console.log('cerrando la App');
    navigator.app.exitApp();
    });
}


function printStatsTotales(dias){
    var url;
    
    if(dias=='seven'){
        url=wiz.Totales[0].info.seven;
        if(url.ev_envio==0){url.ev_envio=1;}
    }else if(dias=='thirty'){
        url=wiz.Totales[0].info.thirty;
        if(url.ev_envio==0){url.ev_envio=1;}
    }else if(dias=='ninety'){
        url=wiz.Totales[0].info.ninety;
        if(url.ev_envio==0){url.ev_envio=1;}
    }else if(dias=='yearly'){
        url=wiz.Totales[0].info.yearly;
        if(url.ev_envio==0){url.ev_envio=1;}
    }
           
    console.log(JSON.stringify(url));
    
    $('#totEm').html(url.ev_envio);
    $('#apTot').html(url.ev_vista);
    $('#apTotP').html((url.ev_vista/url.ev_envio*100).toFixed(2)+'%');
    $("#apTotPp .md-progress-track").css("width", (url.ev_vista/url.ev_envio*100).toFixed(2)+'%');
    $('#apUni').html(url.ev_vista_unica);
    $('#apUniP').html((url.ev_vista_unica/url.ev_envio*100).toFixed(2)+'%');
    $("#apUniPp .md-progress-track").css("width", (url.ev_vista_unica/url.ev_envio*100).toFixed(2)+'%');
    $('#clTot').html(url.ev_click);
    $('#clTotP').html((url.ev_click/url.ev_envio*100).toFixed(2)+'%');
    $("#clTotPp .md-progress-track").css("width", (url.ev_click/url.ev_vista*100).toFixed(2)+'%');
    $('#clUni').html(url.ev_click_unico);
    $('#clUniP').html((url.ev_click_unico/url.ev_envio*100).toFixed(2)+'%');
    $("#clUniPp .md-progress-track").css("width", (url.ev_click_unico/url.ev_vista*100).toFixed(2)+'%');
    $('#reTot').html(url.ev_rebote);
    $('#reTotP').html((url.ev_rebote/url.ev_envio*100).toFixed(2)+'%');
    $("#reTotPp .md-progress-track").css("width", (url.ev_rebote/url.ev_envio*100).toFixed(2)+'%');
    $('#reUni').html(url.ev_rebote_unico);
    $('#reUniP').html((url.ev_rebote_unico/url.ev_envio*100).toFixed(2)+'%');
    $("#reUniPp .md-progress-track").css("width", (url.ev_rebote_unico/url.ev_envio*100).toFixed(2)+'%');
    $('#desTot').html(url.ev_desuscripcion);
    $('#desTotP').html((url.ev_desuscripcion/url.ev_envio*100).toFixed(2)+'%');
    $("#desTotPp .md-progress-track").css("width", (url.ev_desuscripcion/url.ev_envio*100).toFixed(2)+'%');
    
        
    $(".main").removeClass("hidden");
    $body.removeClass("loading");

}