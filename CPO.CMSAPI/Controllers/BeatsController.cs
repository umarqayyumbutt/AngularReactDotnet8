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
    public class BeatsController : ControllerBase
    {
        private readonly ICircleService _circleService;
        private readonly IDivisionService _divisionService;
        private readonly IRegionService _regionService;
        private readonly IDistrictService _districtService;
        private readonly IPoliceStationService _policestationService;
        private readonly IBeatService _beatService;
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public BeatsController(IBeatService beatService, ILoggingService loggingService, IUserService userService, IMapper mapper, IRegionService regionService, IDistrictService districtService, IDivisionService divisionService, ICircleService circleService, IPoliceStationService policestationService)
        {
            _policestationService = policestationService;
            _loggingService = loggingService;
            _userService = userService;
            _regionService = regionService;
            _districtService = districtService;
            _divisionService = divisionService;
            _circleService = circleService;
            _beatService = beatService;
            _loggingService = loggingService;
            _userService = userService;
            this._mapper = mapper;
        }

        [HttpGet("GetAllBeats")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllBeats(int policestaitonId)
        {
            if (policestaitonId == -1)
            {
                var listbeats = await _beatService.GetAllBeatsAsync();
                List<Beat> beat = new List<Beat>();
                beat.Insert(0, new Beat { Id = 0, BeatName = "select an option" });
                foreach (var item in listbeats)
                {
                    beat.Add(item);
                }
                //var regions=_mapper.Map<List<RegionViewModel>>(listregions);
                //if (provinceId > 0)
                //   return (IEnumerable<Region>)regions.Where(r => r.ProvinceId == provinceId.GetValueOrDefault(0));
                return Ok(beat);
            }
            else
            {
                //var listbeats = await _beatService.GetAllBeatsAsync();
                //List<Beat> listbeat = listbeats.ToList().Where(r => r.PoliceStationId == policestaitonId).ToList();
                //List<Beat> beats = new List<Beat>();
                //beats.Insert(0, new Beat { Id = 0, BeatName = "select an option" });
                //foreach (var item in listbeat)
                //{
                //    beats.Add(item);
                //}

                //return Ok(beats);

                var listbeats = await _beatService.GetAllBeatsAsync();
                List<Beat> listbeat = listbeats.ToList().Where(r => r.PoliceStationId == policestaitonId).ToList();
                List<BeatViewModel> listbeatViewModel = _mapper.Map<List<BeatViewModel>>(listbeat);
                List<BeatViewModel> beats = new List<BeatViewModel>();
                beats.Insert(0, new BeatViewModel { id = 0, beatname = "select an option" });
                foreach (var item in listbeatViewModel)
                {
                    beats.Add(item);
                }


                return Ok(beats);
            }
            //var beats = await _beatService.GetAllBeatsAsync();
            //return Ok(beats);
        }
        [HttpGet("GetListBeat")]
        public async Task<IActionResult> GetListBeat(int policestationId)
        {
            var beats = await _beatService.GetAllBeatsAsync();
            
            List<BeatViewModel> listbeats = new List<BeatViewModel>();
            listbeats = _mapper.Map<List<BeatViewModel>>(beats);
            return Ok(listbeats);
        }
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetBeatById(int id)
        //{
        //    var beat = await _beatService.GetBeatByIdAsync(id);
        //    if (beat == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(beat);
        //}

        [HttpPost]
        [HttpPost("AddBeat")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddBeat(BeatViewModel beatViewModel)
        {
            try
            {
                var beat = _mapper.Map<Beat>(beatViewModel);
                await _beatService.AddBeatAsync(beat);
                return CreatedAtAction(nameof(GetBeatById), new { id = beat.Id }, beat);
            }
            catch (Exception ex)
            {
                await LogError(ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
            //await _beatService.AddBeatAsync(beat);
            //return CreatedAtAction(nameof(GetBeatById), new { id = beat.Id }, beat);
        }
        [HttpGet("GetBeatById")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetBeatById(int id)
        {
            var beat = await _beatService.GetBeatByIdAsync(id);
            var policestation = await _policestationService.GetPoliceStationByIdAsync(id);
            var circle = await _circleService.GetCircleByIdAsync(policestation.CircleId.GetValueOrDefault(0));
            var division = await _divisionService.GetDivisionByIdAsync(circle.DivisionId.GetValueOrDefault(0));
            var district = await _districtService.GetDistrictByIdAsync(division.DistrictId.GetValueOrDefault(0));
            var region = await _regionService.GetRegionByIdAsync(district.RegionId.GetValueOrDefault(0));

            var beatViewModel = _mapper.Map<BeatViewModel>(beat);
            beatViewModel.provinceid = region.ProvinceId;
            beatViewModel.regionid = district.RegionId;
            beatViewModel.districtid = division.DistrictId;
            beatViewModel.divisionid = circle.DivisionId;
            beatViewModel.circleid = circle.Id;
            if (beatViewModel == null)
            {
                return NotFound();
            }
            return Ok(beatViewModel);
            //var policestation = await _policestationService.GetPoliceStationByIdAsync(id);
            //if (policestation == null)
            //{
            //    return NotFound();
            //}
            //return Ok(policestation);
        }

        [HttpPut("UpdateBeat/{id}")]
        [ProducesResponseType(typeof(ProvinceViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateBeat(int id, BeatViewModel beatViewModel)
        {
            var beat = _mapper.Map<Beat>(beatViewModel);
            if (id != beat.Id)
            {
                return BadRequest();
            }

            await _beatService.UpdateBeatAsync(beat);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _beatService.DeleteBeatAsync(id);
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
