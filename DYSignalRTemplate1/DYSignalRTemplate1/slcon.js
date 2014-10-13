$(document).ready(function () {
    var slobj = document.all('SLObject');
    // Declare a proxy to reference the hub. 
    var chat = $.connection.DYdin;
    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message) {
        if (slobj != null) {
            slobj.content.SLDataAccess.OnData(name, message);
        }
    };
    // Start the connection.
    $.connection.hub.start().done(function () {
        if (slobj != null) {
            slobj.content.SLDataAccess.OnConnected();
        }
    }).fail(function (reason) {
        if (slobj != null) {
            slobj.content.SLDataAccess.OnErr(reason);
        }
    });
});

function sendToServer(name, message) {
    //authentication
    $.connection.hub.qs = { "userName": name };
    // Call the Send method on the hub. 
    $.connection.DYdin.server.send(name, message);
}