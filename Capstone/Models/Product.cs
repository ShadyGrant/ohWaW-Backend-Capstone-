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
    
        public string Title { get; set; }

        public string Description { get; set; }
    
        public string WebsiteURL { get; set; }
     
        public string ImageLocation { get; set; }
  
        public double Price { get; set; }
        public DateTime CreateDateTime { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
