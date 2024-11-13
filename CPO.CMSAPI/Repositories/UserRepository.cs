using CPO.CMSAPI.Data;
using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CPO.CMSAPI.Repositories
{
    public class UserRepository:Repository<CMSUser>,IUserRepository
    {
        private readonly UserManager<CMSUser> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        //public UserRepository(CMSDbContext context) : base(context)
        //{
        //}
        public UserRepository(CMSDbContext context, UserManager<CMSUser> userManager, RoleManager<IdentityRole<int>> roleManager) : base(context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<CMSUser> FindByUsernameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<bool> CheckPasswordAsync(CMSUser user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<IEnumerable<CMSUser>> GetAllUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<IdentityResult> RegisterAsync(CMSUser user, string password, string role)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                // Ensure the role exists
                //if (!await _roleManager.RoleExistsAsync(role))
                var roleid=await _roleManager.FindByIdAsync(role);
                if (roleid == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole<int>(role));
                }
                // Add the user to the role
                await _userManager.AddToRoleAsync(user, roleid.Name);
            }
            return result;
        }

        public async Task<IdentityResult> UpdateUserAsync(CMSUser user)
        {
            return await _userManager.UpdateAsync(user);
        }

        public async Task<IdentityResult> DeleteUserAsync(CMSUser user)
        {
            return await _userManager.DeleteAsync(user);
        }

        public async Task<IdentityResult> ChangePasswordAsync(CMSUser user, string currentPassword, string newPassword)
        {
            return await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        }


        public async Task<IEnumerable<string>> GetRolesAsync(CMSUser user)
        {
            return await _userManager.GetRolesAsync(user);
            //
            //return await _roleManager.
             //await _roleManager.Roles.Where(r=>roles.Id. r.Id);

        }
        public async Task<IdentityResult> AddRoleAsync(string roleName)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                return await _roleManager.CreateAsync(new IdentityRole<int>(roleName));
            }
            return IdentityResult.Failed(new IdentityError { Description = "Role already exists." });
        }

        public async Task<IdentityResult> EditRoleAsync(string currentRoleName, string newRoleName)
        {
            var role = await _roleManager.FindByNameAsync(currentRoleName);
            if (role != null)
            {
                role.Name = newRoleName;
                return await _roleManager.UpdateAsync(role);
            }
            return IdentityResult.Failed(new IdentityError { Description = "Role not found." });
        }

        public async Task<IdentityResult> DeleteRoleAsync(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role != null)
            {
                return await _roleManager.DeleteAsync(role);
            }
            return IdentityResult.Failed(new IdentityError { Description = "Role not found." });
        }


        public async Task<IEnumerable<IdentityRole<int>>> GetAllRolesAsync()
        {
            return await _roleManager.Roles.ToListAsync();
        }

        // public async Task<IEnumerable<string>> GetRolesNameAsync(CMSUser user)
        public async Task<List<IdentityRole<int>>> GetRolesNameAsync(CMSUser user)
        {
            //var roleids=_userManager.GetRolesAsync(user);
            //_roleManager.get
            //var roles=_roleManager.GetRoleNameAsync();
            List<string> roleNames = _userManager.GetRolesAsync(user).Result.ToList();

            var roles = _roleManager.Roles.Where(r => roleNames.Contains(r.Name.ToString())).ToList();
            //return await _userManager.GetRolesAsync(user);
            //return roleNames.ToList();
            //return roleNames;
            return roles;
            //
            //return await _roleManager.
            //await _roleManager.Roles.Where(r=>roles.Id. r.Id);

        }

       
        public async Task<IdentityRole<int>> GetRoleByIdAsync(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);

            //if (role == null)
            //{
            //    return IdentityResult.Failed(new IdentityError { Description = $"Role with ID {id} not found." });
            //    //return NotFound($"Role with ID {id} not found.");
            //}

            // Optionally, map to a view model if needed
            return role;
        }


        public async Task<IdentityResult> UpdateRoleAsync(RoleViewModel roleViewModel)
        {
            var role = await _roleManager.FindByIdAsync(roleViewModel.id);
            role.Name = roleViewModel.rolename;
            return await _roleManager.UpdateAsync(role);
        }
    }
}
