using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IFriendServiceV2
    {
        FriendV2 Get(int id);
        public List<FriendV2> GetAll();
        public void Delete(int id);
        public Paged<FriendV2> GetPage(int PageIndex, int PageSize);
        public Paged<FriendV2> SearchPage(int PageIndex, int PageSize, string Query);
        public int Add(FriendAddRequestV2 modelFriend, int userId);
        public void Update(FriendUpdateRequestV2 modelFriend, int userId);
    }
}