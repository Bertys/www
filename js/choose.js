var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
       StatusBar.backgroundColorByHexString("#F6F"); 
    }
};

app.initialize();


$( document ).ready(function() {
            deviceReadyM();
});

var x,b,permissions,language,a,z,y,c;
//////////////////START////////////////////////////
function deviceReadyM() {

    $body = $("body");
    $body.addClass("loading");
     loadWizzard();
        
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    x=localStorage.getItem("token");
    b=localStorage.getItem("usrAuxMeu");
    permissions=localStorage.getItem("permissions");
    language=localStorage.getItem("language");
    
    permissions=JSON.parse(permissions);
    
    for(i=0;i<=permissions.length-1;i++){
     permisos.push(permissions[i]);
    }
        console.log(JSON.stringify(permisos));
        console.log(permisos.length);
    
//        console.log(JSON.stringify(permisos[0]));
//        console.log(permisos[0].dmds_id);
  
    
    var auxil='<span>Hugo Planisys</span><div>'+b+'</div>';
    $('#userName').html(auxil);
     
    $body.removeClass("loading");
    $('.main').removeClass("hidden");

//    listenerDashboard();
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

function gotoDashboard(dmdsId,groupId){
    
    localStorage.setItem("dmdsId", dmdsId);
    localStorage.setItem("groupId", groupId);
    location.replace('./dashboard.html');
}

// Handle the back button
function onBackKeyDown() {
    $('#dialog').click();
    startlistenexit();
    }
function startlistenexit(){
    $('#closeapp').click(function(e) {
    console.log('cerrando la App');
    navigator.app.exitApp();
    });
}
