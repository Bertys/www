Vue.use(VueMaterial)


Vue.material.registerTheme({
  default: {
    primary: 'blue-grey',
    accent: 'red'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  },
})
var pageSS;
var campanas= [];
var permisos= [];
var grupos= [];
var totales= [];
var envios= [];
var enviosTot= [];
var detEnvKey= [];
var detEnvVal= [];
var usMail= [{'first': "first",'last': "last",'mail':"language",'mail':"a@b.c"}];

var example2 = new Vue({
  el: '#file-list',
    mounted:showHeader,
  data: {
    parentMessage: 'Campana',
    userMail: usMail,
    listDmds: permisos,
    listGroups: grupos,
    listTotales: totales,
    listCamp: campanas,
    listEnv: envios,
    listEnvTot: enviosTot,
    detallesEnvKey: detEnvKey,
    detallesEnvVal: detEnvVal
  },
  methods: {
//      cargarNuevo: function() {
//          myFunction();
//  }
      openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    },
      dateFormat(data){
      var mifecha = moment(data).format('DD/MM/YY');  
          return mifecha;
      },
      
      onChange(tabIndex) {
        switch (tabIndex) {
            case 0:
                this.activeTab=0;
                console.log('Stats');
                pageSS='Stats';
                $("#mainHeaderStats").removeClass("hidden");
                $("#mainHeaderEnvios").addClass("hidden");
                $("#subheader").addClass("hidden");
            break;
            case 1:
                this.activeTab=1;
                console.log('Envios');
                pageSS='Envios';
                $("#mainHeaderEnvios").removeClass("hidden");
                $("#mainHeaderStats").addClass("hidden");
                if(searched==1){
                $("#subheader").removeClass("hidden");
                    }
            break;
        }
        },
        onTabClick(event){
//            alert('hit')
            console.warn(event.target)
        }
  }

})


//setTimeout(myFunction, 3000);
function showHeader(){
    $(".screenHeader").removeClass("hidden");
}