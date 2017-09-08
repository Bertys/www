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

var enviosMostrados;
var page='envioStats';
var campId, campName;
var envId, envName;
var campId, campName,a,b,c,d,x,y,z,permissions,language,name,nameG;
//////////////////START////////////////////////////
function deviceReadyM() {
    
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    loadWizzard();

    
    
    x=localStorage.getItem("token");
    
    permissions=localStorage.getItem("permissions");
    
    
    b=localStorage.getItem("usrAuxMeu");
    language=localStorage.getItem("language");
    first=localStorage.getItem("first_name");
    enviosMostrados=localStorage.getItem("envMost");
    last=localStorage.getItem("last_name");
//    //actualizacion de los datos del menu
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

    var obj={'userEmail': c,'token': x,'language':language,'numReg':enviosMostrados,'Orderby':'id','orderDir':'desc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,'order_dir':wiz.Perfil[0].info.orderDir};
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
    console.log(wiz.envios.length);
    
    var res1,res2,res3,res4,res5,res6,res7;
    
    
    
    for(i=0;i<wiz.envios.length;i++){
//       console.log( wiz.envios[i].info.envio.id);
        if(wiz.envios[i].info.envio.id==envId){
            
            if(wiz.envios[i].info.ev_envio==0){
        wiz.envios[i].info.ev_envio=1;
    }
            
    console.log('Datos del envío seleccionado.');
    console.log(JSON.stringify(wiz.envios[i].info));
   
//    console.log(JSON.stringify(wiz.enviosTot.info.totalEnvios));
    console.log(JSON.stringify(wiz.enviosTot[0].info));
    $('#totEma').html(wiz.envios[i].info.ev_envio);
    $('#apTot').html(wiz.envios[i].info.ev_vista);
            if((wiz.envios[i].info.ev_vista/wiz.envios[i].info.ev_envio*100).toFixed(0)>=100){
        res1='100%'
        }else{ res1=(wiz.envios[i].info.ev_vista/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%'}
    $('#apTotP').html(res1);
    $("#apTotPp .md-progress-track").css("width",(wiz.envios[i].info.ev_vista/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');   
    $('#apUni').html(wiz.envios[i].info.ev_vista_unica);
            if((wiz.envios[i].info.ev_vista_unica/wiz.envios[i].info.ev_envio*100).toFixed(0)>=100){
        res2='100%'
        }else{ res2=(wiz.envios[i].info.ev_vista_unica/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%'}
    $('#apUniP').html(res2);
    $("#apUniPp .md-progress-track").css("width",(wiz.envios[i].info.ev_vista_unica/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#clTot').html(wiz.envios[i].info.ev_click);
            if((wiz.envios[i].info.ev_click/wiz.envios[i].info.ev_vista).toFixed(0)>=100){
        res3='100%'
        }else{ res3=(wiz.envios[i].info.ev_click/wiz.envios[i].info.ev_vista).toFixed(2)+'%'}
    $('#clTotP').html(res3);
    $("#clTotPp .md-progress-track").css("width",(wiz.envios[i].info.ev_click/wiz.envios[i].info.ev_vista).toFixed(2)+'%');
    $('#clUni').html(wiz.envios[i].info.ev_click_unico);
            if((wiz.envios[i].info.ev_click_unico/wiz.envios[i].info.ev_vista).toFixed(0)>=100){
        res4='100%'
        }else{ res4=(wiz.envios[i].info.ev_click_unico/wiz.envios[i].info.ev_vista).toFixed(2)+'%'}
    $('#clUniP').html(res4);
    $("#clUniPp .md-progress-track").css("width",(wiz.envios[i].info.ev_click_unico/wiz.envios[i].info.ev_vista).toFixed(2)+'%');
//    $('#reTot').html(wiz.envios[i].info.ev_rebote);
//    $('#reTotP').html((wiz.envios[i].info.ev_rebote/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
//    $("#reTotPp .md-progress-track").css("width",(wiz.envios[i].info.ev_rebote/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#reUni').html(wiz.envios[i].info.ev_rebote_hard);
            if((wiz.envios[i].info.ev_rebote_hard/wiz.envios[i].info.ev_envio*100).toFixed(0)>=100){
        res6='100%'
        }else{ res6=(wiz.envios[i].info.ev_rebote_hard/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%'}
    $('#reUniP').html(res6);
    $("#reUniPp .md-progress-track").css("width",(wiz.envios[i].info.ev_rebote_hard/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
    $('#desTot').html(wiz.envios[i].info.ev_desuscripcion);
            if((wiz.envios[i].info.ev_desuscripcion/wiz.envios[i].info.ev_envio*100).toFixed(0)>=100){
        res7='100%'
        }else{ res7=(wiz.envios[i].info.ev_desuscripcion/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%'}
    $('#desTotP').html(res7);
    $("#desTotPp .md-progress-track").css("width",(wiz.envios[i].info.ev_desuscripcion/wiz.envios[i].info.ev_envio*100).toFixed(2)+'%');
        console.log('done'+JSON.stringify(wiz.envios[i].info)); 
        
            
            
            ////////////////////////////////////////////
        //segunda parte
            $('#horEnv').html(wiz.envios[i].info.modificado);
            $('#status').html(wiz.envios[i].info.estado);
            $('#emrem').html(wiz.envios[i].info.envio.remitente);
            $('#asunto').html(wiz.envios[i].info.envio.asunto);
            $('#nomrem').html(wiz.envios[i].info.envio.remitente_nombre);
            $('#emres').html(wiz.envios[i].info.envio.reply_to);
            $('#segmen').html(wiz.envios[i].info.envio.filtro.nombre);
            $('#tipo').html(wiz.envios[i].info.envio.tipo);
            if(wiz.envios[i].info.envio.no_tag==0){
                $('#analy').html('Si');
            }else{
                $('#analy').html('No');
            }
            if(wiz.envios[i].info.envio.dax_tag==0){
                $('#consc').html('Si');
            }else{
                $('#consc').html('No');
            }
        
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

//    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    var data;
    ajx = wiz.getInfo('envio/'+envId+'/'+a,data,wiz.processinfoE1);
}


function  startInfoEnvio(datas){
//    window.frames[0].location = 'data:text/html;'+datas;
//    console.log(datas);
    if(datas==null){
        $("#iframeHelp").html('No hay pieza para este envío.');
        $("#iframe").addClass('hidden');
    }else{
    $("#iframeHelp").addClass('hidden');
    var doc = document.getElementById('iframe').contentWindow.document;
doc.open();
    var datas2="'"+datas+"'";
    datas2 = datas2.replace(/\r/g, '');
    datas2 = datas2.replace(/\t/g, '');
    datas2 = datas2.replace(/\n/g, '');
    console.log(datas2);
doc.write(datas2);
doc.close();
        
        }
        
    $body.removeClass("loading");
//    $("#iframe").focus();
//    $('#datosEmail').trigger('click');
    
//    var link = document.getElementById( 'datosEmail' );
//    var event = document.createEvent( 'HTMLEvents' );

}