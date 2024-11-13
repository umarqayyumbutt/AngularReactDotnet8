using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CPO.CMSAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(Province), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
             var user = await _authService.AuthenticateAsync(model.Username, model.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            var token = _authService.GenerateJwtTokenAsync(user);
            return Ok(new { token, user });

        }
        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterModel model)
        //{
        //    var result = await _authService.RegisterAsync(model);
        //    if (result.Succeeded)
        //    {
        //        return Ok(new { message = "User registered successfully" });
        //    }

        //    return BadRequest(result.Errors);
        //}

        //[HttpPut("update")]
        //public async Task<IActionResult> UpdateUser([FromBody] UpdateUserModel model)
        //{
        //    var result = await _authService.UpdateUserAsync(model);
        //    if (result.Succeeded)
        //    {
        //        return Ok(result);
        //    }

        //    return BadRequest(result.Errors);
        //}

        //[HttpDelete("delete/{username}")]
        //public async Task<IActionResult> DeleteUser(string username)
        //{
        //    var result = await _authService.DeleteUserAsync(username);
        //    if (result.Succeeded)
        //    {
        //        return Ok(result);
        //    }

        //    return BadRequest(result.Errors);
        //}

        //[HttpPut("change-password")]
        //public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        //{
        //    var result = await _authService.ChangePasswordAsync(model);
        //    if (result.Succeeded)
        //    {
        //        return Ok(result);
        //    }

        //    return BadRequest(result.Errors);
        //}

        //[HttpPost("add-role")]
        //public async Task<IActionResult> AddRole(string RoleName)
        //{
        //    var result = await _authService.AddRoleAsync(RoleName);
        //    if (result.Succeeded)
        //    {
        //        return Ok(new { message = "Role added successfully" });
        //    }

        //    return BadRequest(result.Errors);
        //}

        //[HttpPut("edit-role")]
        //public async Task<IActionResult> EditRole(string CurrentRoleName,string NewRoleName)
        //{
        //    var result = await _authService.EditRoleAsync(CurrentRoleName, NewRoleName);
        //    if (result.Succeeded)
        //    {
        //        return Ok(new { message = "Role updated successfully" });
        //    }

        //    return BadRequest(result.Errors);
        //}

        //[HttpDelete("delete-role")]
        //public async Task<IActionResult> DeleteRole(string RoleName)
        //{
        //    var result = await _authService.DeleteRoleAsync(RoleName);
        //    if (result.Succeeded)
        //    {
        //        return Ok(new { message = "Role deleted successfully" });
        //    }

        //    return BadRequest(result.Errors);
        //}
    }
}
