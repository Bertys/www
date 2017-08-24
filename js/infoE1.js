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
    $("#infoE1").removeClass("hidden");
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    
    
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
    envId = localStorage.envioId;
    envName = localStorage.envioName;
    


    
//    console.log(b);
    $('#userName').html(b);
    $('#h2p7').html("<br />Campaña: '"+campName+"'");
    $('#h2p8').html("<br />Envio: '"+envName+"'");
    
    
    
    $body = $("body");
        $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
//        ajaxStop: function() {  }
        });
    
    
    
//    console.log("Tu token es: "+x);
    startEnvios();
//    startInfoEnvio();
    
//    $('#frame').html('<html><header></header><body>Hello world</body></html>');
    
    
    $('#goBack').click(function(e) {
    location.replace('./envios.html');
        });

}

var ajx;
var page='infoE1';
function startEnvios(){

    var obj={'userEmail': c,'token': x,'language':language,'numReg':6,'Orderby':'id','orderDir':'asc','start':0,'pagina':0};
    wiz.processPerfil(obj);

//    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    var data;
    ajx = wiz.getInfo('envio/'+envId+'/'+a,data,wiz.processinfoE1);
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
//    $('#datosEmail').trigger('click');
    
//    var link = document.getElementById( 'datosEmail' );
//    var event = document.createEvent( 'HTMLEvents' );
//
//event.initEvent( 'click', true, true );
//link.dispatchEvent( event );
//var button = document.getElementById("datosEmail");
//button.click();
}


// Handle the back button
    //
    function onBackKeyDown() {
        location.replace('./envios.html');
    }


function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}