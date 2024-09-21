using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using API.Extensions;

namespace API.SignalR
{
    public class UsersHub :Hub
    {
        private readonly PresenceTracker _tracker;
        public UsersHub(PresenceTracker tracker)
        {
            _tracker = tracker;
        }
        public override async Task OnConnectedAsync()
        {
            await _tracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);
            await Clients.Others.SendAsync("UserIsOnLine", Context.User.GetUsername());

            var currentUsers = await _tracker.GetOnlineUsers();

            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await _tracker.UserDisconnected(Context.User.GetUsername(), Context.ConnectionId);
            await Clients.Others.SendAsync("UserIsOffLine", Context.User.GetUsername());
            var currentUsers = await _tracker.GetOnlineUsers();

            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);

            await base.OnDisconnectedAsync(exception);
        }
    }
}
