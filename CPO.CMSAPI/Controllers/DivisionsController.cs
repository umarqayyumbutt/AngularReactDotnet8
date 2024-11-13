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
    public class DivisionsController : ControllerBase
    {
        private readonly IDivisionService _divisionService;
        private readonly IRegionService _regionService;
        private readonly IDistrictService _districtService;
        
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public DivisionsController(IDivisionService divisionService, ILoggingService loggingService, IUserService userService, IMapper mapper, IRegionService regionService, IDistrictService districtService)
        {
            _regionService = regionService;
            _districtService = districtService;
            _divisionService = divisionService;
            _loggingService = loggingService;
            _userService = userService;
            this._mapper = mapper;
        }

        [HttpGet("GetAllDivisions")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllDivisions(int districtId)
        {
            if (districtId == -1)
            {
                var listdivisions = await _divisionService.GetAllDivisionsAsync();
                List<Division> division = new List<Division>();
                division.Insert(0, new Division { Id = 0, Division_Name = "select an option" });
                foreach (var item in listdivisions)
                {
                    division.Add(item);
                }
                //var regions=_mapper.Map<List<RegionViewModel>>(listregions);
                //if (provinceId > 0)
                //   return (IEnumerable<Region>)regions.Where(r => r.ProvinceId == provinceId.GetValueOrDefault(0));
                return Ok(division);
            }
            else
            {
                var listdivisions = await _divisionService.GetAllDivisionsAsync();
                List<Division> listdivision = listdivisions.ToList().Where(r => r.DistrictId == districtId).ToList();
                List<DivisionViewModel> listdivisionViewModel = _mapper.Map<List<DivisionViewModel>>(listdivision);
                List<DivisionViewModel> divisions = new List<DivisionViewModel>();
                divisions.Insert(0, new DivisionViewModel { id = 0, divisionname = "select an option" });
                foreach (var item in listdivisionViewModel)
                {
                    divisions.Add(item);
                }


                return Ok(divisions);
                //var listdivisions = await _divisionService.GetAllDivisionsAsync();
                //List<Division> listdivision = listdivisions.ToList().Where(r => r.DistrictId == districtId).ToList();
                //List<Division> divisions = new List<Division>();
                //divisions.Insert(0, new Division { Id = 0, Division_Name = "select an option" });
                //foreach (var item in listdivision)
                //{
                //    divisions.Add(item);
                //}

                //return Ok(divisions);
            }
            //var divisions = await _divisionService.GetAllDivisionsAsync();
            //return Ok(divisions);
        }
        [HttpGet("GetListDivision")]
        public async Task<IActionResult> GetListDivision(int districtId)
        {
            var divisions = await _divisionService.GetAllDivisionsAsync();
            List<DivisionViewModel> listdivisions = new List<DivisionViewModel>();
            listdivisions = _mapper.Map<List<DivisionViewModel>>(divisions);
            return Ok(listdivisions);
        }
        //[HttpGet("{id}")]
        [HttpGet("GetDivisionById")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetDivisionById(int id)
        {
            //var division = await _divisionService.GetDivisionByIdAsync(id);
            //if (division == null)
            //{
            //    return NotFound();
            //}
            //return Ok(division);
            var division = await _divisionService.GetDivisionByIdAsync(id);
            var district = await _districtService.GetDistrictByIdAsync(division.DistrictId.GetValueOrDefault(0));
            var region = await _regionService.GetRegionByIdAsync(district.RegionId.GetValueOrDefault(0));

            var divisionViewModel = _mapper.Map<DivisionViewModel>(division);
            divisionViewModel.provinceid = region.ProvinceId;
            divisionViewModel.regionid=district.RegionId;
            if (divisionViewModel == null)
            {
                return NotFound();
            }
            return Ok(divisionViewModel);
        }

        [HttpPost("AddDivision")]
        [ProducesResponseType(typeof(DistrictViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddDivision(DivisionViewModel divisionViewModel)
        {
            try
            {
                var division = _mapper.Map<Division>(divisionViewModel);
                await _divisionService.AddDivisionAsync(division);
                return CreatedAtAction(nameof(GetDivisionById), new { id = division.Id }, division);
            }
            catch (Exception ex)
            {
                await LogError(ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
            //await _divisionService.AddDivisionAsync(division);
            //return CreatedAtAction(nameof(GetDivisionById), new { id = division.Id }, division);
        }

        [HttpPut("UpdateDivision/{id}")]
        [ProducesResponseType(typeof(ProvinceViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateDivision(int id, DivisionViewModel divisionViewModel)
        {
            var division = _mapper.Map<Division>(divisionViewModel);
            if (id != division.Id)
            {
                return BadRequest();
            }

            await _divisionService.UpdateDivisionAsync(division);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDivision(int id)
        {
            await _divisionService.DeleteDivisionAsync(id);
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
