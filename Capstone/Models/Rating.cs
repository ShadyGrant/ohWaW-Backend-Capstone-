using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public double Rate { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
