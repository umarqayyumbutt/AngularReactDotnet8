using CPO.CMSAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace CPO.CMSAPI.Interfaces
{
    public interface IUserRepository : IRepository<CMSUser>
    {
        Task<CMSUser> FindByUsernameAsync(string username);
        Task<bool> CheckPasswordAsync(CMSUser user, string password);
        Task<IEnumerable<CMSUser>> GetAllUsersAsync();
        Task<IdentityResult> RegisterAsync(CMSUser user, string password,string role);
        Task<IdentityResult> UpdateUserAsync(CMSUser user);
        Task<IdentityResult> DeleteUserAsync(CMSUser user);
        Task<IdentityResult> ChangePasswordAsync(CMSUser user, string currentPassword, string newPassword);
        //Task<IdentityResult> RegisterAsync(CMSUser user, string password, string role);
        Task<IEnumerable<string>> GetRolesAsync(CMSUser user);
        Task<IdentityResult> AddRoleAsync(string roleName);
        Task<IdentityResult> EditRoleAsync(string currentRoleName, string newRoleName);
        Task<IdentityResult> DeleteRoleAsync(string roleName);
        Task<IEnumerable<IdentityRole<int>>> GetAllRolesAsync();
        Task<IdentityRole<int>> GetRoleByIdAsync(string id);
        Task<List<IdentityRole<int>>> GetRolesNameAsync(CMSUser user);
        Task<IdentityResult> UpdateRoleAsync(RoleViewModel roleViewModel);
    }
}
