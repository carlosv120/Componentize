using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Addresses
{
    public class AddressAddRequest
    {
        // public int Id { get; set; } Id is not included because I want to add, not to update.


        [Required]
        [StringLength(50,MinimumLength = 2)] 
        public string LineOne { get; set; }

        [Required]
        public int SuiteNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string City { get; set; }

        [Required]
        [StringLength(50)]
        public string State { get; set; }

        [Required]
        [StringLength(50)]
        public string PostalCode { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        [Range(-90,90)]
        public double Lat { get; set; }

        [Required]
        [Range(-180, 180)]
        public double Long { get; set; }


    }


}
