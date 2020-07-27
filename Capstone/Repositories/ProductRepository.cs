using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capstone.Data;
using Capstone.Models;
using Microsoft.EntityFrameworkCore;

namespace Capstone.Repositories
{
    public class ProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Product> GetAll()
        {
            var All = _context.Product.Include(p => p.UserProfile)
                                   .Include(p => p.Department)
                                   .OrderByDescending(p => p.CreateDateTime)
                                   .ToList();
            return All;
        }

        public void Add(Product product)
        {
            _context.Add(product);
            _context.SaveChanges();
        }

        public Product GetById(int id)
        {
            return _context.Product.Include(p => p.UserProfile)
                .Include(p => p.Department)
                .FirstOrDefault(p => p.Id == id);
        }


        public List<Product> GetByFirebaseUserId(string id)
        {
            return _context.Product.Include(p => p.UserProfile)
                .Include(p => p.Department)
                .Where(p => p.UserProfile.FirebaseUserId == id)
                .OrderBy(p => p.CreateDateTime)
                .ToList();
        }

        public List<Product> GetProductByDepartmentId(int id)
        {
            return _context.Product.Include(p => p.UserProfile)
                .Include(p => p.Department)
                .Where(p => p.DepartmentId == id)
                .ToList();
        }



        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();
        }


        public void Delete(int id)
        {
            var product = GetById(id);


            _context.Product.Remove(product);
            _context.SaveChanges();
        }


    }
}