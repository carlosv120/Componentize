using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IUserServiceV1
    {
        User Get(int id);
        List<User> GetAll();

        int Add(UserAddRequest modelUser);
        void Delete(int id);
        
        void Update(UserUpdateRequest modelUser);
    }
}