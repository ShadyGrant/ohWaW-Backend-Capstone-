using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capstone.Data;
using Capstone.Models;
using Microsoft.EntityFrameworkCore;

namespace Capstone.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetAll()
        {
            return _context.Comment
                .Include(c => c.UserProfile)
                .Include(c => c.Product)
                .ThenInclude(p => p.UserProfile)
                .ToList();
        }

        public Comment GetById(int id)
        {
            return _context.Comment
                .Include(c => c.UserProfile)
                .Include(c => c.Product)
                .ThenInclude(p => p.UserProfile)
                .FirstOrDefault(c => c.Id == id);
        }

        public List<Comment> GetByProductId(int id)
        {
            return _context.Comment
                            .Include(c => c.Product)
                            .ThenInclude(p => p.UserProfile)
                            .Include(c => c.UserProfile)
                            .Where(c => c.ProductId == id)
                            .OrderByDescending(c => c.CreateDateTime)
                            .ToList();
        }
        public List<Comment> GetCommentsByProduct(int ProductId)
        {
            var All = _context.Comment.Where(c => c.ProductId == ProductId).ToList();

            return All;
        }
        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Delete(Comment comment)
        {

            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
