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
    public class PoliceStationsController : ControllerBase
    {
        private readonly ICircleService _circleService;
        private readonly IDivisionService _divisionService;
        private readonly IRegionService _regionService;
        private readonly IDistrictService _districtService;
        private readonly IPoliceStationService _policestationService;
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public PoliceStationsController(IPoliceStationService policestationService, ILoggingService loggingService, IUserService userService, IMapper mapper, IRegionService regionService, IDistrictService districtService, IDivisionService divisionService, ICircleService circleService)
        {
            _policestationService = policestationService;
            _loggingService = loggingService;
            _userService = userService;
            _regionService = regionService;
            _districtService = districtService;
            _divisionService = divisionService;
            _circleService = circleService;
            this._mapper = mapper;
        }

        [HttpGet("GetAllPoliceStations")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllPoliceStations(int circleId)
        {
            if (circleId == -1)
            {
                var listpolicestations= await _policestationService.GetAllPoliceStationAsync();
                List<PoliceStation> policestation = new List<PoliceStation>();
                policestation.Insert(0, new PoliceStation { Id = 0, PS_Name = "select an option" });
                foreach (var item in listpolicestations)
                {
                    policestation.Add(item);
                }
                //var regions=_mapper.Map<List<RegionViewModel>>(listregions);
                //if (provinceId > 0)
                //   return (IEnumerable<Region>)regions.Where(r => r.ProvinceId == provinceId.GetValueOrDefault(0));
                return Ok(policestation);
            }
            else
            {
                var listpolicestations = await _policestationService.GetAllPoliceStationAsync();
                List<PoliceStation> listpolicestation = listpolicestations.ToList().Where(r => r.CircleId == circleId).ToList();
                List<PoliceStationViewModel> listpolicestationViewModel = _mapper.Map<List<PoliceStationViewModel>>(listpolicestation);
                List<PoliceStationViewModel> policestations = new List<PoliceStationViewModel>();
                policestations.Insert(0, new PoliceStationViewModel { id = 0, psname = "select an option" });
                foreach (var item in listpolicestationViewModel)
                {
                    policestations.Add(item);
                }


                return Ok(policestations);
                //var listpolicestations = await _policestationService.GetAllPoliceStationAsync();
                //List<PoliceStation> listpolicestation= listpolicestations.ToList().Where(r => r.CircleId == circleId).ToList();
                //List<PoliceStation> policestations = new List<PoliceStation>();
                //policestations.Insert(0, new PoliceStation { Id = 0, PS_Name = "select an option" });
                //foreach (var item in listpolicestation)
                //{
                //    policestations.Add(item);
                //}

                //return Ok(policestations);
            }
            //var policestations = await _policestationService.GetAllPoliceStationAsync();
            //return Ok(policestations);
        }
        [HttpGet("GetListPoliceStation")]
        public async Task<IActionResult> GetListPoliceStation(int circleId)
        {
            var policestations = await _policestationService.GetAllPoliceStationAsync();
            List<PoliceStationViewModel> listpolicestations = new List<PoliceStationViewModel>();
            listpolicestations = _mapper.Map<List<PoliceStationViewModel>>(policestations);
            return Ok(listpolicestations);
        }
        [HttpGet("GetPoliceStationById")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPoliceStationById(int id)
        {
            var policestation = await _policestationService.GetPoliceStationByIdAsync(id);
            var circle = await _circleService.GetCircleByIdAsync(policestation.CircleId.GetValueOrDefault(0));
            var division = await _divisionService.GetDivisionByIdAsync(circle.DivisionId.GetValueOrDefault(0));
            var district = await _districtService.GetDistrictByIdAsync(division.DistrictId.GetValueOrDefault(0));
            var region = await _regionService.GetRegionByIdAsync(district.RegionId.GetValueOrDefault(0));

            var policestationViewModel = _mapper.Map<PoliceStationViewModel>(policestation);
            policestationViewModel.provinceid = region.ProvinceId;
            policestationViewModel.regionid = district.RegionId;
            policestationViewModel.districtid = division.DistrictId;
            policestationViewModel.divisionid = circle.DivisionId;
            if (policestationViewModel == null)
            {
                return NotFound();
            }
            return Ok(policestationViewModel);
            //var policestation = await _policestationService.GetPoliceStationByIdAsync(id);
            //if (policestation == null)
            //{
            //    return NotFound();
            //}
            //return Ok(policestation);
        }

        [HttpPost("AddPoliceStation")]
        [ProducesResponseType(typeof(DistrictViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddPoliceStation(PoliceStationViewModel policestationViewModel)
        {
            try
            {
                var policestation = _mapper.Map<PoliceStation>(policestationViewModel);
                await _policestationService.AddPoliceStationAsync(policestation);
                return CreatedAtAction(nameof(GetPoliceStationById), new { id = policestation.Id }, policestation);
            }
            catch (Exception ex)
            {
                await LogError(ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
            //await _policestationService.AddPoliceStationAsync(policestation);
            //return CreatedAtAction(nameof(GetPoliceStationById), new { id = policestation.Id }, policestation);
        }

        [HttpPut("UpdatePoliceStation/{id}")]
        [ProducesResponseType(typeof(ProvinceViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdatePoliceStation(int id, PoliceStationViewModel policestationViewModel)
        {
            var policestation = _mapper.Map<PoliceStation>(policestationViewModel);
            if (id != policestation.Id)
            {
                return BadRequest();
            }

            await _policestationService.UpdatePoliceStationAsync(policestation);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _policestationService.DeletePoliceStationAsync(id);
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
