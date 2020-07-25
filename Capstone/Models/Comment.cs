using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public string Content { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}
