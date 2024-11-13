using AutoMapper;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CPO.CMSAPI.Services
{
    public class AuthService : IAuthService
    {
        //private readonly UserManager<CMSUser> _userManager;
        //private readonly SignInManager<CMSUser> _signInManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IMapper mapper)//(UserManager<CMSUser> userManager, SignInManager<CMSUser> signInManager, IConfiguration configuration)
        {
            //_userManager = userManager;
            //_signInManager = signInManager;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            this._mapper = mapper;
        }

        public async Task<CMSUserViewModel> AuthenticateAsync(string username, string password)
        {
            //var user = await _userManager.FindByNameAsync(username);
            //if (user != null)
            //{
            //    var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            //    if (result.Succeeded)
            //    {
            //        return user;
            //    }
            //}
            //return null;
            //var user = await _unitOfWork.Users.FindByUsernameAsync(username);
            var user = await _unitOfWork.Users.FindByUsernameAsync(username);
            
            //var users = await _unitOfWork.Users.GetAllUsersAsync();
            //foreach (var user in users)
            //{
           // var roles = await _unitOfWork.Users.GetRolesAsync(user);
            var listroles = await _unitOfWork.Users.GetRolesNameAsync(user);
            //var rolesName= await _rolemanage
            var roleViewModel=_mapper.Map<List<RoleViewModel>>(listroles);
            var roles = roleViewModel.Select(i => i.id).ToList();
            var userWithRolesList = new CMSUserViewModel
            {
                CMSUser = user,
                Roles = roles
            };
            //}
            var chkPassword = await _unitOfWork.Users.CheckPasswordAsync(user, password);
            if (user == null )
            {
                return null;
            }
            return userWithRolesList;
        }

        //public async Task<string> GenerateJwtToken(CMSUser user)
        //{
        //    var claims = new[]
        //{
        //    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
        //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //};

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(
        //        issuer: _configuration["Jwt:Issuer"],
        //        audience: _configuration["Jwt:Audience"],
        //        claims: claims,
        //        expires: DateTime.Now.AddMinutes(30),
        //        signingCredentials: creds);

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        public async Task<string> GenerateJwtTokenAsync(CMSUserViewModel user)
        {
            //var claims1 = new[]
            //{
            //    new Claim(JwtRegisteredClaimNames.Sub, user.CMSUser.UserName),
            //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            //    new Claim(ClaimTypes.Name, user.CMSUser.UserName),
            //    //new Claim(ClaimTypes.Role,user.Roles.ToList())
            //   // new Claim(ClaimTypes.Role, user.)
            //};
            //var claims = new List<Claim>();
            //claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.CMSUser.UserName));
            //claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            //claims.Add(new Claim(ClaimTypes.Name, user.CMSUser.UserName));
            //foreach (var role in user.Roles)
            //{
            //    claims.Add(new Claim(ClaimTypes.Role, role));
            //}
            var claims = new List<Claim>
{
    new Claim(JwtRegisteredClaimNames.Sub, user.CMSUser.UserName),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    new Claim(ClaimTypes.Name, user.CMSUser.UserName)
};
            //var roles=
            //var roles = await _userManager.GetRolesAsync(user);
            //claims.AddRange(user.Roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));
            var allroles = await _unitOfWork.Users.GetRolesNameAsync(user.CMSUser);
            // allroles=allroles
            //List<string> roles = roleMngr.Roles.Select(x => x.Name).ToList();
            //foreach (var role in user.Roles)
            //{
            //    if(role=="1")
            //    claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            //    else if(role=="2")
            //        claims.Add(new Claim(ClaimTypes.Role, "User"));

            //}
            foreach (var role in allroles)
            {
                
                    claims.Add(new Claim(ClaimTypes.Role, role.Name.ToString()));
                

            }
            //if (currentUserRoles != null)
            //{
            //    foreach (var userRole in currentUserRoles)
            //    {
            //        claims.Add(new Claim(ClaimTypes.Role, userRole));
            //    }
            //}
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //public async Task<IdentityResult> RegisterAsync(RegisterModel model)
        //{
        //    var user = new CMSUser { UserName = model.Username, Email = model.Email,PasswordHash=model.Password,Resource_Name=model.Resource_Name,cellNo=model.cellNo,ShiftId=model.ShiftId,ProvinceId =model.ProvinceId,RegionId=model.RegionId,DistrictId=model.DistrictId,DivisionId=model.DivisionId,CircleId=model.CircleId,BeatId=model.BeatId,IsDeleted=model.IsDeleted,CreatedBy=model.CreatedBy,CreatedOn=model.CreatedOn };
        //    return await _unitOfWork.Users.RegisterAsync(user, model.Password,model.Role);
        //}

        //public async Task<IdentityResult> UpdateUserAsync(UpdateUserModel model)
        //{
        //    var user = await _unitOfWork.Users.FindByUsernameAsync(model.Username);
        //    if (user == null) return IdentityResult.Failed(new IdentityError { Description = "User not found" });

        //    user.Email = model.Email;
        //    return await _unitOfWork.Users.UpdateUserAsync(user);
        //}

        //public async Task<IdentityResult> DeleteUserAsync(string username)
        //{
        //    var user = await _unitOfWork.Users.FindByUsernameAsync(username);
        //    if (user == null) return IdentityResult.Failed(new IdentityError { Description = "User not found" });

        //    return await _unitOfWork.Users.DeleteUserAsync(user);
        //}

        //public async Task<IdentityResult> ChangePasswordAsync(ChangePasswordModel model)
        //{
        //    var user = await _unitOfWork.Users.FindByUsernameAsync(model.Username);
        //    if (user == null) return IdentityResult.Failed(new IdentityError { Description = "User not found" });

        //    return await _unitOfWork.Users.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
        //}

        //public async Task<IdentityResult> AddRoleAsync(string roleName)
        //{
        //    return await _unitOfWork.Users.AddRoleAsync(roleName);
        //}

        //public async Task<IdentityResult> EditRoleAsync(string currentRoleName, string newRoleName)
        //{
        //    return await _unitOfWork.Users.EditRoleAsync(currentRoleName, newRoleName);
        //}

        //public async Task<IdentityResult> DeleteRoleAsync(string roleName)
        //{
        //    return await _unitOfWork.Users.DeleteRoleAsync(roleName);
        //}
        //public async Task<string> GetCurrentUserIdAsync()
        //{
        //    var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        //    return await Task.FromResult(userId);
        //}

        //public async Task<string> GetCurrentUserNameAsync()
        //{
        //    var userName = _httpContextAccessor.HttpContext?.User?.Identity?.Name;
        //    return await Task.FromResult(userName);
        //}

    }
}
