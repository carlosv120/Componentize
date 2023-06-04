using Sabio.Models.Domain.TechCompanies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Jobs
{
    public class Job
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; } 

        public string Summary { get; set; }

        public int Pay {get; set; }

        public string Slug { get; set; }

        public int StatusId { get; set; }

        public TechCompany TechCompany { get; set; }

        public List<JobSkill> Skills { get; set; }

        public DateTime DateCreated { get; set; }   

        public DateTime DateModified { get; set; }

        public int UserId { get; set; }



    }
}
