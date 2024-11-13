using AutoMapper;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CPO.CMSAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CirclesController : ControllerBase
    {
        private readonly ICircleService _circleService;
        private readonly IDivisionService _divisionService;
        private readonly IRegionService _regionService;
        private readonly IDistrictService _districtService;
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public CirclesController(ICircleService circleService, ILoggingService loggingService, IUserService userService, IMapper mapper, IRegionService regionService, IDistrictService districtService, IDivisionService divisionService)
        {
            _regionService = regionService;
            _districtService = districtService;
            _divisionService = divisionService;
            _circleService = circleService;
            _loggingService = loggingService;
            _userService = userService;
            this._mapper = mapper;
        }

        [HttpGet("GetAllCircles")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllCircles(int divisionId)
        {
            if (divisionId == -1)
            {
                var listcircles = await _circleService.GetAllCirclesAsync();
                List<Circle> circle = new List<Circle>();
                circle.Insert(0, new Circle { Id = 0, Circle_Name = "select an option" });
                foreach (var item in listcircles)
                {
                    circle.Add(item);
                }
                //var regions=_mapper.Map<List<RegionViewModel>>(listregions);
                //if (provinceId > 0)
                //   return (IEnumerable<Region>)regions.Where(r => r.ProvinceId == provinceId.GetValueOrDefault(0));
                return Ok(circle);
            }
            else
            {
                //var listcircles = await _circleService.GetAllCirclesAsync();

                //List<Circle> listcircle = listcircles.ToList().Where(r => r.DivisionId == divisionId).ToList();
                //List<Circle> circles = new List<Circle>();
                //circles.Insert(0, new Circle { Id = 0, Circle_Name = "select an option" });
                //foreach (var item in listcircle)
                //{
                //    circles.Add(item);
                //}

                //return Ok(circles);
                var listcircles = await _circleService.GetAllCirclesAsync();
                List<Circle> listcircle = listcircles.ToList().Where(r => r.DivisionId == divisionId).ToList();
                List<CircleViewModel> listcircleViewModel = _mapper.Map<List<CircleViewModel>>(listcircle);
                List<CircleViewModel> circles = new List<CircleViewModel>();
                circles.Insert(0, new CircleViewModel { id = 0, circlename = "select an option" });
                foreach (var item in listcircleViewModel)
                {
                    circles.Add(item);
                }


                return Ok(circles);
            }
            //var circles = await _circleService.GetAllCirclesAsync();
            //return Ok(circles);
        }
        [HttpGet("GetListCircle")]
        public async Task<IActionResult> GetListCircle(int divisionId)
        {
            var circles = await _circleService.GetAllCirclesAsync();
            List<CircleViewModel> listcircles = new List<CircleViewModel>();
            listcircles = _mapper.Map<List<CircleViewModel>>(circles);
            return Ok(listcircles);
        }
        [HttpGet("GetCircleById")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCircleById(int id)
        {
            var circle=await _circleService.GetCircleByIdAsync(id);
            var division = await _divisionService.GetDivisionByIdAsync(circle.DivisionId.GetValueOrDefault(0));
            var district = await _districtService.GetDistrictByIdAsync(division.DistrictId.GetValueOrDefault(0));
            var region = await _regionService.GetRegionByIdAsync(district.RegionId.GetValueOrDefault(0));

            var circleViewModel = _mapper.Map<CircleViewModel>(circle);
            circleViewModel.provinceid = region.ProvinceId;
            circleViewModel.regionid = district.RegionId;
            circleViewModel.districtid = district.Id;
            if (circleViewModel == null)
            {
                return NotFound();
            }
            return Ok(circleViewModel);
            //var circle = await _circleService.GetCircleByIdAsync(id);
            //if (circle == null)
            //{
            //    return NotFound();
            //}
            //return Ok(circle);
        }

        [HttpPost("AddCircle")]
        [ProducesResponseType(typeof(DistrictViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddCircle(CircleViewModel circleViewModel)
        {
            try
            {
                var circle = _mapper.Map<Circle>(circleViewModel);
                await _circleService.AddCircleAsync(circle);
                return CreatedAtAction(nameof(GetCircleById), new { id = circle.Id }, circle);
            }
            catch (Exception ex)
            {
                await LogError(ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
            //await _circleService.AddCircleAsync(circle);
            //return CreatedAtAction(nameof(GetCircleById), new { id = circle.Id }, circle);
        }

        [HttpPut("UpdateCircle/{id}")]
        [ProducesResponseType(typeof(ProvinceViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateCircle(int id, CircleViewModel circleViewModel)
        {
            var circle = _mapper.Map<Circle>(circleViewModel);
            if (id != circle.Id)
            {
                return BadRequest();
            }

            await _circleService.UpdateCircleAsync(circle);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCircle(int id)
        {
            await _circleService.DeleteCircleAsync(id);
            return NoContent();
        }
        private async Task LogError(Exception ex)
        {
            var userId = await _userService.GetCurrentUserIdAsync();
            var userName = await _userService.GetCurrentUserNameAsync();
            await _loggingService.LogErrorAsync(ex, userId, userName);
        }
    }
}
