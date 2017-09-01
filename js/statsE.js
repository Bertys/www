var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//        deviceReadyM();
    },

    onDeviceReady: function() {
//        this.receivedEvent('deviceready');
        deviceReadyM();
    }
};

app.initialize();


var page='envioStats';
var campId, campName;
var envId, envName;
var campId, campName,a,b,c,d,x,y,z,permissions,language,name,nameG;
//////////////////START////////////////////////////
function deviceReadyM() {
    
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    loadWizzard();

    
    
    x=localStorage.getItem("token");
    b=localStorage.getItem("usrAuxMeu");
    permissions=localStorage.getItem("permissions");
    language=localStorage.getItem("language");
    

//      z=28;
//      a=14;
//      y='Default';
//      c='PLANISYS Production';
//        
//    localStorage.idDmDsSel = a;
//    localStorage.nameDmDsSel = c;
//    localStorage.idGroupSel = z;
//    localStorage.nameGroupSel = y;
    
    a=localStorage.getItem("dmdsId");
    name=localStorage.getItem("dmdsName");
    z=localStorage.getItem("groupId");
    nameG=localStorage.getItem("groupName");
    
    campId = localStorage.campanaId;
    campName = localStorage.campanaName;
    envId = localStorage.envioId;
    envName = localStorage.envioName;
    


    
//    console.log(b);
    $('#userName').html(b);
    $('#h2p7').html("<br />Campaña: '"+campName+"'");
    $('#h2p8').html("<br />Envio: '"+envName+"'");
    
    
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() {  }
        });
    
    
    
//    console.log("Tu token es: "+x);
    startEnvios();
    startEnvios2();
    
    

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






function inicioStatsEnv(){
    
    console.log(JSON.stringify(wiz.envios[0].info));
    console.log(envId);
    
    
    
    for(i=0;i<wiz.envios.length;i++){
        if(wiz.envios[i].info.envio.id==envId){
    console.log(wiz.envios[i].info);
   
//    console.log(JSON.stringify(wiz.enviosTot.info.totalEnvios));
    console.log(JSON.stringify(wiz.enviosTot[0].info));
    $('#totEma').html(wiz.envios[i].info.ev_envio);
    $('#apTot').html(wiz.envios[i].info.ev_vista);
    $('#apTotP').html((wiz.envios[i].info.ev_vista/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $("#apTotPp .md-progress-track").css("width",(wiz.envios[i].info.ev_vista/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');   
    $('#apUni').html(wiz.envios[i].info.ev_vista_unica);
    $('#apUniP').html((wiz.envios[i].info.ev_vista_unica/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $("#apUniPp .md-progress-track").css("width",(wiz.envios[i].info.ev_vista_unica/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#clTot').html(wiz.envios[i].info.ev_click);
    $('#clTotP').html((wiz.envios[i].info.ev_click/wiz.envios[i].info.ev_vista).toFixed(2)+'%');
    $("#clTotPp .md-progress-track").css("width",(wiz.envios[i].info.ev_click/wiz.envios[i].info.ev_vista).toFixed(2)+'%');
    $('#clUni').html(wiz.envios[i].info.ev_click_unico);
    $('#clUniP').html((wiz.envios[i].info.ev_click_unico/wiz.envios[i].info.ev_vista).toFixed(2)+'%');
    $("#clUniPp .md-progress-track").css("width",(wiz.envios[i].info.ev_click_unico/wiz.envios[i].info.ev_vista).toFixed(2)+'%');
    $('#reTot').html(wiz.envios[i].info.ev_rebote);
    $('#reTotP').html((wiz.envios[i].info.ev_rebote/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $("#reTotPp .md-progress-track").css("width",(wiz.envios[i].info.ev_rebote/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#reUni').html(wiz.envios[i].info.ev_rebote_hard);
    $('#reUniP').html((wiz.envios[i].info.ev_rebote_hard/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $("#reUniPp .md-progress-track").css("width",(wiz.envios[i].info.ev_rebote_hard/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#desTot').html(wiz.envios[i].info.ev_desuscripcion);
    $('#desTotP').html((wiz.envios[i].info.ev_desuscripcion/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $("#desTotPp .md-progress-track").css("width",(wiz.envios[i].info.ev_desuscripcion/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
        console.log('done'+JSON.stringify(wiz.envios[i].info)); 
        
        //segunda parte
            $('#horEnv').html(JSON.stringify(wiz.envios[i].info.modificado));
            $('#status').html(JSON.stringify(wiz.envios[i].info.estado));
            $('#emrem').html(JSON.stringify(wiz.envios[i].info.envio.remitente));
            $('#asunto').html(JSON.stringify(wiz.envios[i].info.envio.asunto));
            $('#nomrem').html(JSON.stringify(wiz.envios[i].info.envio.remitente_nombre));
            $('#emres').html(JSON.stringify(wiz.envios[i].info.envio.reply_to));
//            $('#segmen').html(JSON.stringify(wiz.envios[i].info.envio));
            $('#tipo').html(JSON.stringify(wiz.envios[i].info.envio.tipo));
//            $('#analy').html(JSON.stringify(wiz.envios[i].info.envio));
//            $('#consc').html(JSON.stringify(wiz.envios[i].info.envio));
        
    }
    }
    
    $(".main").removeClass("hidden");
    $body.removeClass("loading");
   
}
//////////////////START////////////////////////////

    
    
    $('#goBack').click(function(e) {
    location.replace('./statsC.html');
        });



// Handle the back button
    //
    function onBackKeyDown() {
        location.replace('./statsC.html');
    }

var ajx;
//var page='infoE1';
function startEnvios2(){

    var obj={'userEmail': c,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

//    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    var data;
    ajx = wiz.getInfo('envio/'+envId+'/'+a,data,wiz.processinfoE1);
}


function  startInfoEnvio(datas){
//    window.frames[0].location = 'data:text/html;'+datas;
    console.log(datas);
    var doc = document.getElementById('iframe').contentWindow.document;
doc.open();
    var datas2="'"+datas+"'";
    datas2 = datas2.replace(/\r/g, '');
    datas2 = datas2.replace(/\t/g, '');
    datas2 = datas2.replace(/\n/g, '');
    console.log(datas2);
doc.write(datas2);
doc.close();
    $body.removeClass("loading");
    $("#iframe").focus();
//    $('#datosEmail').trigger('click');
    
//    var link = document.getElementById( 'datosEmail' );
//    var event = document.createEvent( 'HTMLEvents' );
//
//event.initEvent( 'click', true, true );
//link.dispatchEvent( event );
//var button = document.getElementById("datosEmail");
//button.click();
}