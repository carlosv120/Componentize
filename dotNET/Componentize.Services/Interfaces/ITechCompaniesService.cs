using Sabio.Models;
using Sabio.Models.Domain.TechCompanies;
using Sabio.Models.Requests.TechCompanies;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ITechCompaniesService
    {
        TechCompany Get(int id);
        List<TechCompany> GetAll();
        Paged<TechCompany> GetPage(int PageIndex, int PageSize);
        Paged<TechCompany> SearchPage(int PageIndex, int PageSize, string Query);
        int Add(TechCompaniesAddRequest modelCompany, int userId);
        void Update(TechCompaniesUpdateRequest modelCompany, int userId);
        void Delete(int id);
    }
}