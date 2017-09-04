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
    $('#userName').html(b);
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

function cargarMas(){
    var ajx;
    var aux=contCampMost*6;
    console.log(totalCampanas);
    if(aux<=totalCampanas){
    var obj={'userEmail': b,'token': x,'language':language,'numReg':6,'Orderby':'created_at','orderDir':'desc','start':aux,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,'order_dir':wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);
    contCampMost++;
        
    }
}
    
    
function cargarCampanas(){
    var ajx
    search=0;
    var obj={'userEmail': b,'token': x,'language':language,'numReg':60,'Orderby':'created_at','orderDir':'desc','start':0,'pagina':0};
    wiz.processPerfil(obj);

    var data={'start' : wiz.Perfil[0].info.start, 'length' : wiz.Perfil[0].info.numReg,'order_by' : wiz.Perfil[0].info.Orderby,"order_dir":wiz.Perfil[0].info.orderDir};
    ajx = wiz.postInfo('campanas/'+a+'/'+z,data,wiz.processCampanas);

}




function printCampanas(dias){
    var algo=0;
    
    campanas.splice(0, campanas.length);
    
    
	if(typeof pag === "undefined") {
        pag = 0;
    console.log(JSON.stringify(wiz.Campanas[0]));
    }
        
        
        for(i=0;i<=wiz.Campanas.length-1;i++){
            var a = moment(wiz.Campanas[i].info.created_at);
        var now = moment();
        var auxx=now.diff(a, 'days');
//            console.log(auxx);
            if(auxx<=dias){
            campanas.push(wiz.Campanas[i]);
                algo=1;
            }
        }
    
        if(algo==0){
                var obj={"info":{"id":0,"name":"No hay campañas con ese tiempo","stats":{"envios_hechos":0,"emails_enviados":0,"open_rate":0,"click_rate":0}}};
                campanas.push(obj);
            }
    
    $("#loading").hide();
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
    
        if(wiz.Campanas.length==0){
                var obj={"info":{"id":0,"name":"No hay campañas con ese tiempo","stats":{"envios_hechos":0,"emails_enviados":0,"open_rate":0,"click_rate":0}}};
                campanas.push(obj);
            }
    
    $("#loading").hide();
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
    
    var ajx;
    var search=1;
    //    var str = $('#inputSearch').val();
    var obj={'userEmail': b,'token': x,'language':language,'numReg':50,'Orderby':'created_at','orderDir':'desc','start':0,'pagina':0};
    wiz.processPerfil(obj);
    
    
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
