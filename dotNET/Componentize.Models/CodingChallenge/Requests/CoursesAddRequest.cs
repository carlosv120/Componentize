using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.CodingChallenge.Requests
{
    public class CoursesAddRequest
    {
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Description { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int SeasonTermId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int TeacherId {get; set; }


    }
}
