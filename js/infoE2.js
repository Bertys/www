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
    $("#infoE2").removeClass("hidden");
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    
        $('#userName').html(b);
    $('#h2p7').html("<br />Campaña: '"+campName+"'");
    $('#h2p8').html("<br />Envio: '"+envName+"'");
    
       $('#goBack').click(function(e) {
    location.replace('./statsE.html');
        });
$('#aCampanas').click(function(e) {
      location.replace('./campanas.html');
        });
    
        $('#aDashboard').click(function(e) {
    location.replace('./dashboard.html');
        });


}

// Handle the back button
    //
    function onBackKeyDown() {
        location.replace('./statsE.html');
    }
