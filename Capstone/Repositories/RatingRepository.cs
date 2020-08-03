using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capstone.Data;
using Capstone.Models;
using Microsoft.EntityFrameworkCore;

namespace Capstone.Repositories
{
    public class RatingRepository
    {
        private readonly ApplicationDbContext _context;

        public RatingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Rating> GetAll()
        {
            return _context.Rating
                .Include(c => c.UserProfile)
                .Include(c => c.Product)
                .ThenInclude(p => p.UserProfile)
                .ToList();
        }

        public Rating GetById(int id)
        {
            return _context.Rating
               .Include(c => c.UserProfile)
                .Include(c => c.Product)
                .ThenInclude(p => p.UserProfile)
                .FirstOrDefault(c => c.Id == id);
        }

        public List<Rating> GetByProductId(int id)
        {
            return _context.Rating
                            .Include(c => c.Product)
                            .ThenInclude(p => p.UserProfile)
                            .Include(c => c.UserProfile)
                            .Where(c => c.ProductId == id)
                            .ToList();
        }
        public List<Rating> GetRatingsByProduct(int ProductId)
        {
            var All = _context.Rating.Where(r => r.ProductId == ProductId).ToList();

            return All;
        }
        public void Add(Rating rating)
        {
            _context.Add(rating);
            _context.SaveChanges();
        }
    }
}