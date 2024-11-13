using CPO.CMSAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterAsync(Register model);
        Task<IdentityResult> UpdateUserAsync(CMSUser model);
        Task<IdentityResult> DeleteUserAsync(string username);
        Task<IdentityResult> ChangePasswordAsync(ChangePasswordModel model);
        Task<IEnumerable<CMSUserViewModel>> GetAllUsersAsync();
        Task<IEnumerable<string>> GetRolesAsync(CMSUser user);
        Task<IdentityResult> AddRoleAsync(string roleName);
        Task<IdentityRole<int>> GetRoleByIdAsync(string id);
        Task<IdentityResult> EditRoleAsync(string currentRoleName, string newRoleName);
        Task<IdentityResult> UpdateRoleAsync(RoleViewModel role);
        Task<IdentityResult> DeleteRoleAsync(string roleName);
        Task<IEnumerable<IdentityRole<int>>> GetAllRolesAsync();
        Task<string> GetCurrentUserIdAsync();
        Task<string> GetCurrentUserNameAsync();
        Task<CMSUser> GetUserById(int userid);
       // Task<IdentityResult> UpdateUserAsync(CMSUser model);
    }
}
