using AutoMapper;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CPO.CMSAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DropDownController : ControllerBase
    {
        private readonly IDropDownService _dropdownService;
        private readonly ILoggingService _loggingService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public DropDownController(IDropDownService dropdownService, ILoggingService loggingService, IUserService userService, IMapper mapper)
        {
            _dropdownService = dropdownService;
            _loggingService = loggingService;
            _loggingService = loggingService;
            this._mapper = mapper;

        }

        [HttpGet("GetAllDropDownList")]
        public async Task<IActionResult> GetAllDropDownList(string tableName, int? id = null)
        {
            var dropdownlist = await Task.Run(() => _dropdownService.GetAllDropDownListAsync(tableName,id));
           List<DropDownListViewModel> listdropdown= new List<DropDownListViewModel>();
           
            listdropdown = _mapper.Map<List<DropDownListViewModel>>(dropdownlist);
            listdropdown.Insert(0,new DropDownListViewModel { id = 0, name = "select an option" });
            if (listdropdown.Count()==0) {
                listdropdown.Add(new DropDownListViewModel { id = 0,name= "select an option" });
            }

            return Ok(listdropdown);
        }
        private async Task LogError(Exception ex)
        {
            var userId = await _userService.GetCurrentUserIdAsync();
            var userName = await _userService.GetCurrentUserNameAsync();
            await _loggingService.LogErrorAsync(ex, userId, userName);
        }
    }
}
