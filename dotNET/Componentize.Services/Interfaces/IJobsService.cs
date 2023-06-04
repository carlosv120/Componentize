using Sabio.Models;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Jobs;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IJobsService
    {
        List<Job> GetAll();
        Job Get(int id);
        Paged<Job> GetPage(int PageIndex, int PageSize);
        Paged<Job> SearchPage(int PageIndex, int PageSize, string Query);
        int Add(JobsAddRequest modelJob, int userId);
        void Update(JobsUpdateRequest modelJob, int userId);
        void Delete(int id);
    }
}