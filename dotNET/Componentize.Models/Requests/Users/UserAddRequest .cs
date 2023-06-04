using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Users
{
    public class UserAddRequest
    {

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string FirstName { get; set; }


        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string LastName { get; set; }


        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }


        [Required(ErrorMessage = "Password is required")]
        [StringLength(64, ErrorMessage = "Must be between 2 and 64 characters", MinimumLength = 2)]
        [DataType(DataType.Password)]
        public string Password { get; set; }



        [Required(ErrorMessage = "Confirm Password is required")]
        [StringLength(64, ErrorMessage = "Must be between 2 and 64 characters", MinimumLength = 2)]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string PasswordConfirm { get; set; }


        [Required]
        [StringLength(500, MinimumLength = 2)]
        public string AvatarUrl { get; set; }


        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string TenantId { get; set; }




    }
}
