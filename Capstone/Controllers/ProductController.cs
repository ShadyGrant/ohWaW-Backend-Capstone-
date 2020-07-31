using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Capstone.Data;
using Capstone.Models;
using Capstone.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductRepository _productRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly CommentRepository _commentRepository;

        public ProductController(ApplicationDbContext context)
        {
            _productRepository = new ProductRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _commentRepository = new CommentRepository(context);
        }

        //getting the authorized user's 
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_productRepository.GetAll());
        }
      
        [HttpPost]
        public IActionResult Post(Product product)
        {
            product.CreateDateTime = DateTime.Now;
            var currentUser = GetCurrentUserProfile();
            product.UserProfileId = currentUser.Id;

            _productRepository.Add(product);
            return CreatedAtAction("Get", new { id = product.Id }, product);
        }
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _productRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpGet("getbydepartment/{id}")]
        public IActionResult GetProductByDepartmentId(int id)
        {
            var product = _productRepository.GetProductByDepartmentId(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpGet("getbyuser")]
        public IActionResult GetByUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(_productRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUserProfile();
            product.UserProfileId = currentUser.Id;

            _productRepository.Update(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _productRepository.Delete(id);
            return NoContent();
        }
    }

}