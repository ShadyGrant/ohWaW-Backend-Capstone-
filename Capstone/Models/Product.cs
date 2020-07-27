using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string WebsiteURL { get; set; }
        [Required]
        public string ImageLocation { get; set; }
        [Required]
        public double Price { get; set; }
        public DateTime CreateDateTime { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
