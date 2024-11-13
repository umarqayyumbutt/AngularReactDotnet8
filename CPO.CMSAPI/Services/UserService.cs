using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace CPO.CMSAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserService(IUnitOfWork unitOfWork, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)//(UserManager<CMSUser> userManager, SignInManager<CMSUser> signInManager, IConfiguration configuration)
        {
            //_userManager = userManager;
            //_signInManager = signInManager;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<IdentityResult> RegisterAsync(Register model)
        {
            var user = new CMSUser { UserName = model.Username, Email = model.Email, PasswordHash = model.Password, Resource_Name = model.Resource_Name, cellNo = model.cellNo, ShiftId = model.ShiftId, ProvinceId = model.ProvinceId, RegionId = model.RegionId, DistrictId = model.DistrictId, DivisionId = model.DivisionId, CircleId = model.CircleId, BeatId = model.BeatId, IsDeleted = model.IsDeleted, CreatedBy = model.CreatedBy, CreatedOn = model.CreatedOn };
            return await _unitOfWork.Users.RegisterAsync(user, model.Password, model.Role);
        }

        public async Task<IdentityResult> UpdateUserAsync(CMSUser model)
        {
            //var user = await _unitOfWork.Users.FindByUsernameAsync(model.UserName);
            var user = await _unitOfWork.Users.GetByIdAsync(model.Id);
            if (user == null) return IdentityResult.Failed(new IdentityError { Description = "User not found" });

            
            user.Email = model.Email;
            user.Resource_Name = model.Resource_Name; 
            user.cellNo = model.cellNo; 
            user.ShiftId = model.ShiftId; 
            user.ProvinceId = model.ProvinceId; 
            user.RegionId = model.RegionId; 
            user.DistrictId = model.DistrictId; 
            user.DivisionId = model.DivisionId; 
            user.CircleId = model.CircleId; 
            user.BeatId = model.BeatId; 
            user.IsDeleted = model.IsDeleted; 
            user.ModifiedBy = model.CreatedBy; 
            user.ModifiedOn = DateTime.Now;
            // user.UserName = model.UserName;
            //user.Email = model.Email;
            var userrepo= await _unitOfWork.Users.UpdateUserAsync(user);
            await _unitOfWork.SaveAsync();
            return userrepo;
        }

        public async Task<IdentityResult> DeleteUserAsync(string username)
        {
            var user = await _unitOfWork.Users.FindByUsernameAsync(username);
            if (user == null) return IdentityResult.Failed(new IdentityError { Description = "User not found" });

            return await _unitOfWork.Users.DeleteUserAsync(user);
        }
        public async Task<IEnumerable<CMSUserViewModel>> GetAllUsersAsync()
        {
            var userWithRolesList = new List<CMSUserViewModel>();
           var users= await _unitOfWork.Users.GetAllUsersAsync();
            foreach (var user in users)
            {
                var roles =  await _unitOfWork.Users.GetRolesAsync(user);
                userWithRolesList.Add(new CMSUserViewModel
                {
                    CMSUser = user,                  
                    Roles = (List<string>)roles
                });
            }
            //userWithRolesList.Add()
            //return await _unitOfWork.Users.GetAllUsersAsync();
            return userWithRolesList;

        }

        public async Task<IdentityResult> ChangePasswordAsync(ChangePasswordModel model)
        {
            var user = await _unitOfWork.Users.FindByUsernameAsync(model.Username);
            if (user == null) return IdentityResult.Failed(new IdentityError { Description = "User not found" });

            return await _unitOfWork.Users.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
        }
        public async Task<IEnumerable<string>> GetRolesAsync(CMSUser user)
        {
            return await _unitOfWork.Users.GetRolesAsync(user);
        }
        public async Task<IdentityResult> AddRoleAsync(string roleName)
        {
            return await _unitOfWork.Users.AddRoleAsync(roleName);
        }
        public async Task<IdentityRole<int>> GetRoleByIdAsync(string id)
        {
            return await _unitOfWork.Users.GetRoleByIdAsync(id);
        }
        public async Task<IdentityResult> EditRoleAsync(string currentRoleName, string newRoleName)
        {
            return await _unitOfWork.Users.EditRoleAsync(currentRoleName, newRoleName);
        }
        public async Task<IdentityResult> UpdateRoleAsync(RoleViewModel role)
        {
            return await _unitOfWork.Users.UpdateRoleAsync(role);
        }
        public async Task<IdentityResult> DeleteRoleAsync(string roleName)
        {
            return await _unitOfWork.Users.DeleteRoleAsync(roleName);
        }
        public async Task<IEnumerable<IdentityRole<int>>> GetAllRolesAsync()
        {
            return await _unitOfWork.Users.GetAllRolesAsync();
        }
        public async Task<string> GetCurrentUserIdAsync()
        {
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            return await Task.FromResult(userId);
        }

        public async Task<string> GetCurrentUserNameAsync()
        {
            var userName = _httpContextAccessor.HttpContext?.User?.Identity?.Name;
            return await Task.FromResult(userName);
        }
        public async Task<CMSUser> GetUserById(int userid)
        {
            return await _unitOfWork.Users.GetByIdAsync(userid);
        }
    }
}
