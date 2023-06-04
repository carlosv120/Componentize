using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IFriendServiceV3
    {
        FriendV3 Get(int id);
        List<FriendV3> GetAll();
        void Delete(int id);
        Paged<FriendV3> GetPage(int PageIndex, int PageSize);
        Paged<FriendV3> SearchPage(int PageIndex, int PageSize, string Query);
        int Add(FriendAddRequestV3 modelFriend, int userId);
        int AddObject(FriendAddRequestV3 modelFriend, int userId);
        void Update(FriendUpdateRequestV3 modelFriend, int userId);
    }
}