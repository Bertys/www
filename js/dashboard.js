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

//////////////////START////////////////////////////
function deviceReadyM() {
    
  StatusBar.backgroundColorByName("orange"); 
  
    
//    console.log(StatusBar);
    
     loadWizzard();
        
    document.addEventListener("backbutton", onBackKeyDown, false);
    
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
    
    
     
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { 
            $body.removeClass("loading");
        $(".main").removeClass("hidden");
        }
        });
    

    listenerDashboard();
    
    var ajx;
    var obj={'userEmail': b,'token': x,'language':language,'numReg':50,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);
    
    
    
    
   

function onBackKeyDown() {
         $('#dialog').click();
    startlistenexit();
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
        console.log('Total: Envios>'+auxEnv+' Emails>'+auxEmails+' OR>'+(auxOR/wiz.Campanas.length).toFixed(2)+'% CR>'+(auxCR/wiz.Campanas.length).toFixed(2)+'%');
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
    
    
    $('#aCampanas').click(function(e) {
        location.replace('./campanas.html');
        e.preventDefault();
    });
    
}


function startlistenexit(){
    $('#closeapp').click(function(e) {
        console.log('cerrando lapp');
        navigator.app.exitApp();
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
    console.log(wiz.Perfil);
}

// Handle the back button
    //
    