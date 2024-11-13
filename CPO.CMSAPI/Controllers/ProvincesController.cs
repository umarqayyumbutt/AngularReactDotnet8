using AutoMapper;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using Swashbuckle.Swagger.Annotations;

namespace CPO.CMSAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController : ControllerBase
    {
        private readonly IProvinceService _provinceService;
        private readonly IAuthService _authService;
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public ProvincesController(IProvinceService provinceService, IAuthService authService, ILoggingService loggingService, IUserService userService, IMapper mapper)
        {
            _provinceService = provinceService;
            _authService = authService;
            _loggingService = loggingService;
            _userService = userService;
            this._mapper = mapper;
        }

        [HttpGet("GetAllProvinces")]
        public async Task<IActionResult> GetAllProvinces()
       {
            var listprovinces = await _provinceService.GetAllProvincesAsync(); 
            List<ProvinceViewModel> listprovinceViewModel=_mapper.Map<List<ProvinceViewModel>>(listprovinces);
            List<ProvinceViewModel> provinces = new List<ProvinceViewModel>();
            provinces.Insert(0, new ProvinceViewModel { id = 0, provincename = "select an option" });
            foreach (var item in listprovinceViewModel)
            {
                provinces.Add(item);
            }

            return Ok(provinces);
        }
        [HttpGet("GetListProvince")]
        public async Task<IActionResult> GetListProvince()
        {
            var provinces = await _provinceService.GetAllProvincesAsync();
            List<ProvinceViewModel> listprovinces = new List<ProvinceViewModel>();
            listprovinces=_mapper.Map<List<ProvinceViewModel>>(provinces);
             return Ok(listprovinces);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProvinceById(int id)
        {
            var region = await _provinceService.GetProvinceByIdAsync(id);
            if (region == null)
            {
                return NotFound();
            }
            return Ok(region);
        }

        [HttpPost("AddProvince")]
        //[SwaggerResponse(201, "Province created successfully", typeof(Province))]
        //[SwaggerResponse(400, "Invalid input")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddProvince(ProvinceViewModel provinceViewModel)
        {
            try
            {
                var province = _mapper.Map<Province>(provinceViewModel);
                if (ModelState.IsValid)
                {
                    
                    await _provinceService.AddProvinceAsync(province);
                }
                //
                return CreatedAtAction(nameof(GetProvinceById), new { id = province.Id }, province);
            }
            catch (Exception ex)
            {
                await LogError(ex);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        //[HttpPut("{id}")]
        //[HttpPut("UpdateProvince")]
        [HttpPut("UpdateProvince/{id}")]
        [ProducesResponseType(typeof(ProvinceViewModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateProvince(int id,[FromBody]ProvinceViewModel provinceViewModel)
        {
            //if (id != province.Id)
            //{
            //    return BadRequest();
            //}
            //province.Id=id;
            var province= _mapper.Map<Province>(provinceViewModel);
            await _provinceService.UpdateProvinceAsync(province);
            return NoContent();
        }

        [HttpDelete("DeleteProvince")]
        public async Task<IActionResult> DeleteProvince(int id)
        {
            //await _provinceService.DeleteProvinceAsync(id);
            var province = await _provinceService.GetProvinceByIdAsync(id);
            if (province == null)
            {
                return NotFound();
            }
            province.IsDeleted = true;
            await _provinceService.UpdateProvinceAsync(province);
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
