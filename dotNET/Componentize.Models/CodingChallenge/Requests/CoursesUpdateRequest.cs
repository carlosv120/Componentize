using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.CodingChallenge.Requests
{
    public class CoursesUpdateRequest : CoursesAddRequest, IModelIdentifier
    {
        public int Id { get; set; }

    }
}
