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
var dmdsSel=0;
var x,b,permissions,language,a,z,y,c,dmdsId,dmdsName,groupId,groupName;
//////////////////START////////////////////////////
function deviceReadyM() {

    $body = $("body");
    $body.addClass("loading");
     loadWizzard();
        
    document.addEventListener("backbutton", onBackKeyDownC, false);
    
    x=localStorage.getItem("token");
    b=localStorage.getItem("usrAuxMeu");
    permissions=localStorage.getItem("permissions");
    language=localStorage.getItem("language");
    
    

    cargarDmds();
    
    
//        console.log(JSON.stringify(permisos[0]));
//        console.log(permisos[0].dmds_id);
  
    
    
    $('#preSelect').html('Hola '+b+',');
    
     
    

//    listenerDashboard();
}

function cargarDmds(){
    var ajx
    var obj={'userEmail': b,'token': x,'language':language,'numReg':60,'Orderby':'created_at','orderDir':'desc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.getInfo('dmdss',null,wiz.processDMDS);

}

function printDMDS(){
//    console.log(wiz.DMDS);
    console.log(JSON.stringify(wiz.DMDS));
    
    for(i=0;i<=wiz.DMDS.length-1;i++){
     permisos.push(wiz.DMDS[i].info);
    }
    
    console.log(permisos.length);
    if(permisos.length==1){
        dmdsId=permisos[0].id;
        dmdsName=permisos[0].name;
        groupId=permisos[0].groups[0].id;
        groupName=permisos[0].groups[0].name;
        
       localStorage.setItem("dmdsId", dmdsId);
  localStorage.setItem("dmdsName", dmdsName);
    localStorage.setItem("groupId", groupId);
  localStorage.setItem("groupName", groupName);


  location.replace('./dashboard.html');
    }
    $body.removeClass("loading");
    $body.removeClass("hidden");
    $('.main').removeClass("hidden");
    
}
$('#butDash').click(function(e) {
    

    dmdsId=$( "#dmds option" ).attr('value');
//    console.log(dmdsId);
    if(dmdsId!= undefined){
    for(i=0;i<=permisos.length-1;i++){
    if(dmdsId==permisos[i].id){
        dmdsId=permisos[i].id;
        dmdsName=permisos[i].name;
        groupId=permisos[i].groups[0].id;
        groupName=permisos[i].groups[0].name;
    }
        }
    }
    
//    console.log(dmdsId);
//    console.log(dmdsName);
//    console.log(groupId);
//    console.log(groupName);
    localStorage.setItem("dmdsId", dmdsId);
  localStorage.setItem("dmdsName", dmdsName);
    localStorage.setItem("groupId", groupId);
  localStorage.setItem("groupName", groupName);


  location.replace('./dashboard.html');
});

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




function gotoDashboard(dmdsId,dmdsName){
    
    dmdsId=dmdsId;
    localStorage.setItem("dmdsId", dmdsId);
    localStorage.setItem("dmdsName", dmdsName);
    
    localStorage.setItem("grouId", 1);
    location.replace('./dashboard.html');
    
//    cargarGrupos();
}

function cargarGrupos(){
    var ajx
    var obj={'userEmail': b,'token': x,'language':language,'numReg':60,'Orderby':'created_at','orderDir':'desc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.getInfo('dmds/group/'+dmdsId,null,wiz.processGroups);

}


// Handle the back button
function onBackKeyDownC() {
    $('#dialog').click();
    startlistenexit();
    }
function startlistenexit(){
    $('#closeapp').click(function(e) {
    console.log('cerrando la App');
    navigator.app.exitApp();
    });
}
