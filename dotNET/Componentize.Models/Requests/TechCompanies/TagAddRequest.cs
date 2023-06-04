using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TechCompanies
{
    public class TagAddRequest
    {
        [Required]
        [StringLength(128, MinimumLength = 2)]
        public string Tag { get; set; }

    }
}
