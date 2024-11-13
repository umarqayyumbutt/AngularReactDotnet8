using AutoMapper;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CPO.CMSAPI.Controllers
{
    //  [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly IRegionService _regionService;
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public RegionsController(IRegionService regionService, ILoggingService loggingService, IUserService userService, IMapper mapper)
        {
            _regionService = regionService;
            _loggingService = loggingService;
            _loggingService = loggingService;
            this._mapper = mapper;
        }

        [HttpGet("GetAllRegions")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllRegions(int provinceId)
        {
            if (provinceId == -1)
            {
                var listregions = await _regionService.GetAllRegionsAsync();
                List<RegionViewModel> listregionViewModel = _mapper.Map<List<RegionViewModel>>(listregions);
                List<RegionViewModel> regions = new List<RegionViewModel>();
                regions.Insert(0, new RegionViewModel { id = 0, name = "select an option" });
                foreach (var item in listregionViewModel)
                {
                    regions.Add(item);
                }
                //List<Region> regions = new List<Region>();
                //regions.Insert(0, new Region { Id = 0, Name = "select an option" });
                //foreach (var item in listregions)
                //{
                //    regions.Add(item);
                //}
                //var regions=_mapper.Map<List<RegionViewModel>>(listregions);
                //if (provinceId > 0)
                //   return (IEnumerable<Region>)regions.Where(r => r.ProvinceId == provinceId.GetValueOrDefault(0));
                return Ok(regions);
            }
            else
            {
                var listregions = await _regionService.GetAllRegionsAsync();
                List<Region> listregion=listregions.ToList().Where(r=>r.ProvinceId==provinceId).ToList();
                List<RegionViewModel> listregionViewModel =_mapper.Map<List<RegionViewModel>>(listregion);
                List<RegionViewModel> regions = new List<RegionViewModel>();
                    regions.Insert(0, new RegionViewModel { id = 0, name = "select an option" });
                foreach (var item in listregionViewModel)
                {
                    regions.Add(item);
                }
                
               
                return Ok(regions);
            }
        }
        [HttpGet("GetListRegion")]
        public async Task<IActionResult> GetListRegion()
        {
            var regions = await _regionService.GetAllRegionsAsync();
            List<RegionViewModel> listregions = new List<RegionViewModel>();
            listregions = _mapper.Map<List<RegionViewModel>>(regions);
            return Ok(listregions);
        }
        [HttpPost("GetRegionById")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetRegionById([FromBody]int id)
        {
            //if (provinceId > 0)
            //{
            //    var region = await _regionService.GetAllRegionsAsync();
            //    if (region == null)
            //    {
            //        return NotFound();
            //    }
            //    return Ok(region.Where(r => r.ProvinceId == 1).ToList());
            //}
            //else
            //{
                var region = await _regionService.GetRegionByIdAsync(Convert.ToInt32(id));
            var regionViewModel=_mapper.Map<RegionViewModel>(region);
            if (region == null)
            {
                return NotFound();
            }
            return Ok(regionViewModel);
            //}
        }
        //[HttpGet("{id}", Name ="GetRegionByProvinceId")]
        //public async Task<IActionResult> GetRegionByProvinceId(int id)
        //{
        //    var region = await _regionService.GetAllRegionsAsync();
        //    if (region == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(region.Where(r=>r.ProvinceId==1).ToList());
        //}

        // [HttpPost]
        [HttpPost("AddRegion")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddRegion(RegionViewModel regionViewModel)
        {
            try
            {
                var region = _mapper.Map<Region>(regionViewModel);
                if (ModelState.IsValid)
                    await _regionService.AddRegionAsync(region);
                return CreatedAtAction(nameof(GetRegionById), new { id = region.Id }, region);
            }
            catch (Exception ex)
            {
                await LogError(ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        //[HttpPut("{id}")]
        //[HttpPut("UpdateProvince")]
        [HttpPut("UpdateRegion/{id}")]
        [ProducesResponseType(typeof(ProvinceViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateRegion(int id, [FromBody]RegionViewModel regionViewModel)
        {
            var region = _mapper.Map<Region>(regionViewModel);
            if (region.Id==0)
            {
                return BadRequest();
            }
            region.Id = id;
            await _regionService.UpdateRegionAsync(region);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Region), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteRegion(int id)
        {
            await _regionService.DeleteRegionAsync(id);
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
