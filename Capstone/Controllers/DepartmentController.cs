using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capstone.Data;
using Capstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Capstone.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentRepository _departmentRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public DepartmentController(ApplicationDbContext context)
        {
            _departmentRepository = new DepartmentRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_departmentRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var department = _departmentRepository.GetById(id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }

    }
}
