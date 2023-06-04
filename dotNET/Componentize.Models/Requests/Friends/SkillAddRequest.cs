using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Friends
{
    public class SkillAddRequest
    {
        [Required]
        [StringLength(128, MinimumLength = 2)]
        public string Name { get; set; }

    }
}
