using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Jobs
{
    public class JobsAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 2)]
        public string Description { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Summary { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int Pay { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Slug { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int StatusId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int TechCompanyId { get; set; }

        public List<string> Skills { get; set; }
    }
}
