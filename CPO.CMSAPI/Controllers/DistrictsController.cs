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
    public class DistrictsController : ControllerBase
    {
        private readonly IDistrictService _districtService;
        private readonly IRegionService _regionService;
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public DistrictsController(IDistrictService districtService, ILoggingService loggingService,IUserService userService, IMapper mapper, IRegionService regionService)
        {
            _districtService = districtService;
            _loggingService = loggingService;
            _userService = userService;
            this._mapper = mapper;
            _regionService = regionService;
        }

        [HttpGet("GetAllDistricts")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllDistricts(int regionId)
        {
            if (regionId == -1)
            {
                var listdistricts = await _districtService.GetAllDistrictsAsync();
                List<DistrictViewModel> listdistrictViewModel = _mapper.Map<List<DistrictViewModel>>(listdistricts);
                List<DistrictViewModel> districts = new List<DistrictViewModel>();
                districts.Insert(0, new DistrictViewModel { id = 0, districtname = "select an option" });
                foreach (var item in listdistrictViewModel)
                {
                    districts.Add(item);
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
                return Ok(districts);
                //var listdistricts = await _districtService.GetAllDistrictsAsync();
                //List<District> district = new List<District>();
                //district.Insert(0, new District { Id = 0, District_Name = "select an option" });
                //foreach (var item in listdistricts)
                //{
                //    district.Add(item);
                //}
                ////var regions=_mapper.Map<List<RegionViewModel>>(listregions);
                ////if (provinceId > 0)
                ////   return (IEnumerable<Region>)regions.Where(r => r.ProvinceId == provinceId.GetValueOrDefault(0));
                //return Ok(district);
            }
            else
            {
                //var listdistricts = await _districtService.GetAllDistrictsAsync();
                //List<District> listdistrict = listdistricts.ToList().Where(r => r.RegionId == regionId).ToList();
                //List<District> districts = new List<District>();
                //districts.Insert(0, new District { Id = 0, District_Name = "select an option" });
                //foreach (var item in listdistrict)
                //{
                //    districts.Add(item);
                //}

                //return Ok(districts);
                var listdistricts = await _districtService.GetAllDistrictsAsync();
                List<District> listdistrict = listdistricts.ToList().Where(r => r.RegionId == regionId).ToList();
                List<DistrictViewModel> listdistrictViewModel = _mapper.Map<List<DistrictViewModel>>(listdistrict);
                List<DistrictViewModel> districts = new List<DistrictViewModel>();
                districts.Insert(0, new DistrictViewModel { id = 0, districtname = "select an option" });
                foreach (var item in listdistrictViewModel)
                {
                    districts.Add(item);
                }


                return Ok(districts);
            }
            //var district = await _districtService.GetAllDistrictsAsync();
            //return Ok(district);
        }
        [HttpGet("GetListDistrict")]
        public async Task<IActionResult> GetListDistrict(int regionId)
        {
            var districts = await _districtService.GetAllDistrictsAsync();
            List<DistrictViewModel> listdistricts = new List<DistrictViewModel>();
            listdistricts = _mapper.Map<List<DistrictViewModel>>(districts);
            return Ok(listdistricts);
        }
        [HttpGet("GetDistrictById")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetDistrictById(int id)
        {
            var district = await _districtService.GetDistrictByIdAsync(id);
            var region=await _regionService.GetRegionByIdAsync(district.RegionId.GetValueOrDefault(0));
           
            var districtViewModel=_mapper.Map<DistrictViewModel>(district);
            districtViewModel.provinceid = region.ProvinceId;
            if (district == null)
            {
                return NotFound();
            }
            return Ok(districtViewModel);
        }

        [HttpPost("AddDistrict")]
        [ProducesResponseType(typeof(DistrictViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddDistrict(DistrictViewModel districtViewModel)
        {
            try
            {
                var district =_mapper.Map<District>(districtViewModel);
                await _districtService.AddDistrictAsync(district);
                return CreatedAtAction(nameof(GetDistrictById), new { id = district.Id }, district);
            }
            catch (Exception ex)
            {
                await LogError(ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
           
        }

        [HttpPut("UpdateDistrict/{id}")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateDistrict(int id, [FromBody] DistrictViewModel districtViewModel)
        {
            if (id != districtViewModel.id)
            {
                return BadRequest();
            }
            var district=_mapper.Map<District>(districtViewModel);
            await _districtService.UpdateDistrictAsync(district);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteDistrict(int id)
        {
            await _districtService.DeleteDistrictAsync(id);
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
