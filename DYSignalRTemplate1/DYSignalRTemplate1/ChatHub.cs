using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DYSignalRTemplate1
{
    [HubName("DYdin")]
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            var user = Context.QueryString["userName"];
            if (user == null || !user.StartsWith("j"))
            {
                return;
            }
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }
    }
}