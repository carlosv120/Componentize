using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Friends
{
    public class FriendAddRequestV3 : FriendAddRequestV2
    {
        //If Skills is an array of strings use this:
        public List<string> Skills {get; set;}


        //If Skills is an array of object with property "Name" use this:
        public List<SkillAddRequest> SkillsObject { get; set; }
    }
}
