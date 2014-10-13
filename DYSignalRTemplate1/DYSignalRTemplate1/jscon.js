$(document).ready(function () {
    // Declare a proxy to reference the hub. 
    var chat = $.connection.DYdin;
    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message) {
        // Html encode display name and message. 
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page. 
        $('#discussion').append('<li><strong>' + encodedName
            + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    };

    // Start the connection.
    $.connection.hub.start()
    .done(function () { $('#discussion').append('Now connected, ID=' + $.connection.hub.id); })
    .fail(function () { $('#discussion').append('Could not Connect!'); });

    $('#sendmessage').click(function () {
        // Call the Send method on the hub. 
        chat.server.send($('#name').val(), $('#message').val());
        // Clear text box and reset focus for next comment. 
        $('#message').val('');
    });

    $('#login').click(function () {
        //authentication
        $.connection.hub.qs = { "userName": $('#name').val() };
        // Add the message to the page. 
        $('#discussion').append('<li><strong>login data ok</strong>:&nbsp;&nbsp;</li>');
    });
});