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
    public class RatingController : ControllerBase
    {
        private readonly RatingRepository _ratingRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public RatingController(ApplicationDbContext context)
        {
            _ratingRepository = new RatingRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ratingRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var rating = _ratingRepository.GetById(id);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating);
        }

        [HttpGet("getbyproduct/{id}")]
        public IActionResult GetByProduct(int id)
        {
            var Rating = new RatingViewModel();
            Rating.Ratings = _ratingRepository.GetByProductId(id);
            Rating.AverageRatings = Rating.Ratings.Average(r => r.Rate);
            return Ok(Rating);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        [Authorize]
        [HttpPost]
        public IActionResult Post(Rating rating)
        {
            var currentUser = GetCurrentUserProfile();
            rating.UserProfileId = currentUser.Id;

            _ratingRepository.Add(rating);
            return CreatedAtAction("Get", new { id = rating.Id }, rating);
        }
    }
}
