using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capstone.Data;
using Capstone.Models;

namespace Capstone.Repositories
{
    public class DepartmentRepository
    {
            private readonly ApplicationDbContext _context;

            public DepartmentRepository(ApplicationDbContext context)
            {
                _context = context;
            }

            public List<Department> GetAll()
            {
                return _context.Department
                    .OrderBy(d => d.Name)
                    .ToList();

            }
            public Department GetById(int id)
            {
                return _context.Department.FirstOrDefault(c => c.Id == id);
            }

        }
}

