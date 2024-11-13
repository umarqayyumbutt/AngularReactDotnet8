using CPO.CMSAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace CPO.CMSAPI.Services.Interfaces
{
    public interface IAuthService
    {
        //Task<CMSUser> Authenticate(string username, string password);
        //Task<string> GenerateJwtToken(CMSUser user);
        Task<CMSUserViewModel> AuthenticateAsync(string username, string password);
        Task<string> GenerateJwtTokenAsync(CMSUserViewModel user);
        //Task<IdentityResult> RegisterAsync(RegisterModel model);
        //Task<IdentityResult> UpdateUserAsync(UpdateUserModel model);
        //Task<IdentityResult> DeleteUserAsync(string username);
        //Task<IdentityResult> ChangePasswordAsync(ChangePasswordModel model);
        //Task<IdentityResult> AddRoleAsync(string roleName);
        //Task<IdentityResult> EditRoleAsync(string currentRoleName, string newRoleName);
        //Task<IdentityResult> DeleteRoleAsync(string roleName);
        //Task<string> GetCurrentUserIdAsync();
        //Task<string> GetCurrentUserNameAsync();
    }
}
