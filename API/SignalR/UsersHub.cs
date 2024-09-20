using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;

namespace API.SignalR
{
    public class UsersHub :Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Others.SendAsync("UserIsOnLine", Context.User.GetUsername());
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Others.SendAsync("UserIsOffLine", Context.User.GetUsername());

            await base.OnDisconnectedAsync(exception);
        }
    }
}
