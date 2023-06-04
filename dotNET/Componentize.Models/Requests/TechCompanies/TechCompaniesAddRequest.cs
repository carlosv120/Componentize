using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TechCompanies
{
    public class TechCompaniesAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 2)]
        public string Profile { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Summary { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Headline { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 2)]
        public string ContactInformation { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Slug { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int StatusId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int ImageTypeId { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 2)]
        public string ImageUrl { get; set; }

        public List<string> Tags { get; set; }
    }
}
