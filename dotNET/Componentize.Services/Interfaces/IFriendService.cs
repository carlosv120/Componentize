using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IFriendService
    {
        int Add(FriendAddRequest modelFriend, int userId);
        void Delete(int id);
        Friend Get(int id);

        public Friend GetByIdJSON(int id);


        List<Friend> GetAll();
        void Update(FriendUpdateRequest modelFriend, int userId);
        public Paged<Friend> GetPage(int PageIndex, int PageSize);
    }
}