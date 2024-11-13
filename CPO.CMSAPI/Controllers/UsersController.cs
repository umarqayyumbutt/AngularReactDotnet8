using AutoMapper;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CPO.CMSAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILoggingService _loggingService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, ILoggingService loggingService, IMapper mapper)
        {
            _userService = userService;
            _loggingService = loggingService;
            this._mapper = mapper;
        }

        [HttpPost("Register")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
        {
            var register = _mapper.Map<Register>(registerViewModel);
            var result = await _userService.RegisterAsync(register);
            if (result.Succeeded)
            {
                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(result.Errors);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody]UserViewModel userViewModel)
        {
            CMSUser user=_mapper.Map<CMSUser>(userViewModel);

           // CMSUser user=await _userService.GetUserById(updateduser.Id);
            //user=_mapper.Map<CMSUser>(updateduser);
            var result = await _userService.UpdateUserAsync(user);
            if (result.Succeeded)
            {
                return Ok(result);
            }

            return BadRequest(result.Errors);
        }
        //[Authorize(Roles = "Admin")]
        [HttpDelete("delete/{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            var result = await _userService.DeleteUserAsync(username);
            if (result.Succeeded)
            {
                return Ok(result);
            }

            return BadRequest(result.Errors);
        }
        
       // [HttpGet]
        //[Authorize(Roles = "Admin")]
        [HttpGet("GetAllUsers")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllUsers()
        {
            var allusers = await _userService.GetAllUsersAsync();
            var users=_mapper.Map<List<UserViewModel>>(allusers);
            return Ok(users);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var result = await _userService.ChangePasswordAsync(model);
            if (result.Succeeded)
            {
                return Ok(result);
            }

            return BadRequest(result.Errors);
        }
        //[HttpGet("current-user")]
        //public async Task<IActionResult> GetCurrentUserWithRoles()
        //{
        //    var user = await _userService.GetCurrentUserAsync();
        //    if (user == null)
        //    {
        //        return Unauthorized();
        //    }

        //    var roles = await _userService.GetRolesAsync(user);

        //    var userWithRolesDto = new UserWithRolesDto
        //    {
        //        UserId = user.Id,
        //        UserName = user.UserName,
        //        Email = user.Email,
        //        Roles = roles.ToList()
        //    };

        //    return Ok(userWithRolesDto);
        //}
        //[Authorize(Roles = "Admin")]
        [HttpPost("AddRole")]
        //[SwaggerResponse(400, "Invalid input")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddRole([FromBody]RoleViewModel role)
        {
            var result = await _userService.AddRoleAsync(role.rolename);
            if (result.Succeeded)
            {
                return Ok(new { message = "Role added successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("GetRoleById")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetRoleById([FromBody]int id)
        {
            var role = await _userService.GetRoleByIdAsync(id.ToString());//_roleManager.FindByIdAsync(id.ToString());

            if (role == null)
            {
                return NotFound($"Role with ID {id} not found.");
            }

            // Optionally, map to a view model if needed
            var roleViewModel = new RoleViewModel
            {
                id = role.Id.ToString(),
                rolename = role.Name
            };

            return Ok(roleViewModel);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("edit-role")]
        public async Task<IActionResult> EditRole(string CurrentRoleName, string NewRoleName)
        {
            var result = await _userService.EditRoleAsync(CurrentRoleName, NewRoleName);
            if (result.Succeeded)
            {
                return Ok(new { message = "Role updated successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPut("UpdateRole")]
        public async Task<IActionResult> UpdateRole(RoleViewModel role)
        {
            var result = await _userService.UpdateRoleAsync(role);
            if (result.Succeeded)
            {
                return Ok(new { message = "Role updated successfully" });
            }

            return BadRequest(result.Errors);
        }
        //[Authorize(Roles = "Admin")]
        [HttpDelete("delete-role")]
        public async Task<IActionResult> DeleteRole(string RoleName)
        {
            var result = await _userService.DeleteRoleAsync(RoleName);
            if (result.Succeeded)
            {
                return Ok(new { message = "Role deleted successfully" });
            }

            return BadRequest(result.Errors);
        }
        //[Authorize(Roles = "Admin")]
        [HttpGet("GetAllRoles")]
        public async Task<IActionResult> GetAllRoles()
       {
            var roles = await _userService.GetAllRolesAsync();
            var roleViewModel=_mapper.Map<List<RoleViewModel>>(roles.ToList());

            return Ok(roleViewModel);
        }
        //private readonly IUnitOfWork _unitOfWork;

        //public UsersController(IUnitOfWork unitOfWork)
        //{
        //    _unitOfWork = unitOfWork;   
        //}
        //[HttpGet("GetUserById")]
        //[HttpGet("{id}")]
        //[ProducesResponseType(typeof(UserViewModel), StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("GetUserById")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUserById([FromBody] int id)
        {
            var user = await _userService.GetUserById(id);
            UserViewModel model = _mapper.Map<UserViewModel>(user);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(model);
        }
        //[HttpGet]
        //[Route("GetAllUsers")]
        //public async Task<IActionResult> GetAllUsers()
        //{
        //    var users=await _unitOfWork.Users.GetAllAsync();
        //    return Ok(users);
        //}

        //[HttpPost]
        //[Route("CreateUser")]
        //public async Task<IActionResult> CreateUser([FromBody] CMSUser user)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        await _unitOfWork.Users.AddAsync(user);
        //        await _unitOfWork.SaveAsync();
        //        return CreatedAtAction(nameof(GetUserById), new {id=user.Id},user);
        //    }
        //    return BadRequest(ModelState);

        //}
        //[HttpPut]
        //[Route("UpdateUser")]
        //public async Task<IActionResult> UpdateUser(int id, UserViewModel userViewModel)
        //{
        //    CMSUser user=_mapper.Map<CMSUser>(userViewModel);
        //    if (id != user.Id)
        //    {
        //        return BadRequest();
        //    }
        //    if (ModelState.IsValid)
        //    {
        //        await _userService.UpdateUserAsync(user);
        //        //await _unitOfWork.SaveAsync();
        //        return NoContent();
        //    }
        //    return BadRequest(ModelState);
        //}
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUser(string id)
        //{
        //    await _unitOfWork.Users.DeleteAsync(id);
        //    await _unitOfWork.SaveAsync();
        //    return NoContent();

        //}
    }
}
