using AutoMapper;
using CPO.CMSAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace CPO.CMSAPI.Mapper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            //CreateMap<Province,
            //    ProvinceViewModel>().ReverseMap();
            CreateMap<Province, ProvinceViewModel>()
                .ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.provincename, opt => opt.MapFrom(s => s.Province_Name))
                .ForMember(d => d.createdby, opt => opt.MapFrom(s => s.CreatedBy));
            CreateMap<ProvinceViewModel, Province>()
                 .ForMember(d => d.Id, opt => opt.MapFrom(s => s.id))
                 .ForMember(d => d.Province_Name, opt => opt.MapFrom(s => s.provincename))
                 .ForMember(d => d.CreatedBy, opt => opt.MapFrom(s => s.createdby));
            CreateMap<Region,
               RegionViewModel>()
               .ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.provinceid, opt => opt.MapFrom(s => s.ProvinceId))
                .ForMember(d => d.createdby, opt => opt.MapFrom(s => s.CreatedBy));
            CreateMap<RegionViewModel,
               Region > ()
               .ForMember(d => d.Id, opt => opt.MapFrom(s => s.id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.name))
                .ForMember(d => d.ProvinceId, opt => opt.MapFrom(s => s.provinceid))
                .ForMember(d => d.CreatedBy, opt => opt.MapFrom(s => s.createdby));
            //CreateMap<Region,
            //    RegionViewModel>().ReverseMap();
            //CreateMap<RegionViewModel,
            //    Region>().ReverseMap();
            //CreateMap<District,
            //  DistrictViewModel>().ReverseMap();
            CreateMap<District,
              DistrictViewModel>()
              .ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
              .ForMember(d => d.districtname, opt => opt.MapFrom(s => s.District_Name))
              .ForMember(d => d.districtcode, opt => opt.MapFrom(s => s.District_Code))
              .ForMember(d => d.districturduname, opt => opt.MapFrom(s => s.District_Urduname))
              .ForMember(d => d.regionid, opt => opt.MapFrom(s => s.RegionId));
            CreateMap<DistrictViewModel,
              District>()
              .ForMember(d => d.Id, opt => opt.MapFrom(s => s.id))
              .ForMember(d => d.District_Name, opt => opt.MapFrom(s => s.districtname))
              .ForMember(d => d.District_Code, opt => opt.MapFrom(s => s.districtcode))
              .ForMember(d => d.District_Urduname, opt => opt.MapFrom(s => s.districturduname))
              .ForMember(d => d.RegionId, opt => opt.MapFrom(s => s.regionid));
            //CreateMap<Division,
            // DivisionViewModel>().ReverseMap();
            CreateMap<Division,
            DivisionViewModel>()
             .ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
              .ForMember(d => d.divisionname, opt => opt.MapFrom(s => s.Division_Name))
              .ForMember(d => d.divisionurduname, opt => opt.MapFrom(s => s.Division_UrduName))
              .ForMember(d => d.abbr, opt => opt.MapFrom(s => s.Abbr))
              .ForMember(d => d.districtid, opt => opt.MapFrom(s => s.DistrictId));
            CreateMap<DivisionViewModel,
            Division> ()
             .ForMember(d => d.Id, opt => opt.MapFrom(s => s.id))
              .ForMember(d => d.Division_Name, opt => opt.MapFrom(s => s.divisionname))
              .ForMember(d => d.Division_UrduName, opt => opt.MapFrom(s => s.divisionurduname))
              .ForMember(d => d.Abbr, opt => opt.MapFrom(s => s.abbr))
              .ForMember(d => d.DistrictId, opt => opt.MapFrom(s => s.districtid));
            //CreateMap<Circle,
            // CircleViewModel>().ReverseMap();
            CreateMap<Circle,
             CircleViewModel>()
             .ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
              .ForMember(d => d.circlename, opt => opt.MapFrom(s => s.Circle_Name))
              .ForMember(d => d.circleurduname, opt => opt.MapFrom(s => s.Circle_Urduname))
              .ForMember(d => d.abbr, opt => opt.MapFrom(s => s.Abbr))
              .ForMember(d => d.divisionid, opt => opt.MapFrom(s => s.DivisionId));

            CreateMap<CircleViewModel,
             Circle > ()
             .ForMember(d => d.Id, opt => opt.MapFrom(s => s.id))
              .ForMember(d => d.Circle_Name, opt => opt.MapFrom(s => s.circlename))
              .ForMember(d => d.Circle_Urduname, opt => opt.MapFrom(s => s.circleurduname))
              .ForMember(d => d.Abbr, opt => opt.MapFrom(s => s.abbr))
              .ForMember(d => d.DivisionId, opt => opt.MapFrom(s => s.divisionid));
            //CreateMap<PoliceStation,
            // PoliceStationViewModel>().ReverseMap();
            CreateMap<PoliceStation,
            PoliceStationViewModel>()
            .ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
              .ForMember(d => d.psname, opt => opt.MapFrom(s => s.PS_Name))
              .ForMember(d => d.psurduname, opt => opt.MapFrom(s => s.PS_Urduname))
              .ForMember(d => d.psabbr, opt => opt.MapFrom(s => s.PS_Abbr))
              .ForMember(d => d.circleid, opt => opt.MapFrom(s => s.CircleId));
            CreateMap<PoliceStationViewModel,
            PoliceStation>()
            .ForMember(d => d.Id, opt => opt.MapFrom(s => s.id))
              .ForMember(d => d.PS_Name, opt => opt.MapFrom(s => s.psname))
              .ForMember(d => d.PS_Urduname, opt => opt.MapFrom(s => s.psurduname))
              .ForMember(d => d.PS_Abbr, opt => opt.MapFrom(s => s.psabbr))
              .ForMember(d => d.CircleId, opt => opt.MapFrom(s => s.circleid));
            
            CreateMap<Beat,
             BeatViewModel>().ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
              .ForMember(d => d.beatname, opt => opt.MapFrom(s => s.BeatName))
              .ForMember(d => d.beatno, opt => opt.MapFrom(s => s.BeatNo))
              .ForMember(d => d.policestationid, opt => opt.MapFrom(s => s.PoliceStationId));
            CreateMap<BeatViewModel,
             Beat>().ForMember(d => d.Id, opt => opt.MapFrom(s => s.id))
              .ForMember(d => d.BeatName, opt => opt.MapFrom(s => s.beatname))
              .ForMember(d => d.BeatNo, opt => opt.MapFrom(s => s.beatno))
              .ForMember(d => d.PoliceStationId, opt => opt.MapFrom(s => s.policestationid));

            CreateMap<Register,
            RegisterViewModel>().ReverseMap();
            CreateMap<CMSUserViewModel, UserViewModel>()
            .ForMember(d => d.id, opt => opt.MapFrom(s => s.CMSUser.Id))
            .ForMember(d => d.username, opt => opt.MapFrom(s => s.CMSUser.UserName))
            .ForMember(d => d.email, opt => opt.MapFrom(s => s.CMSUser.Email))
            .ForMember(d => d.resourcename, opt => opt.MapFrom(s => s.CMSUser.Resource_Name))
            .ForMember(d => d.cellno, opt => opt.MapFrom(s => s.CMSUser.cellNo))
            .ForMember(d => d.shiftid, opt => opt.MapFrom(s => s.CMSUser.ShiftId))
            .ForMember(d => d.provinceid, opt => opt.MapFrom(s => s.CMSUser.ProvinceId))
            .ForMember(d => d.regionid, opt => opt.MapFrom(s => s.CMSUser.RegionId))
            .ForMember(d => d.districtid, opt => opt.MapFrom(s => s.CMSUser.DistrictId))
            .ForMember(d => d.divisionid, opt => opt.MapFrom(s => s.CMSUser.DivisionId))
            .ForMember(d => d.circleid, opt => opt.MapFrom(s => s.CMSUser.CircleId))
            .ForMember(d => d.beatid, opt => opt.MapFrom(s => s.CMSUser.BeatId));
            
            CreateMap<CMSUser, UserViewModel>()
             .ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.username, opt => opt.MapFrom(s => s.UserName))
            .ForMember(d => d.email, opt => opt.MapFrom(s => s.Email))
            .ForMember(d => d.resourcename, opt => opt.MapFrom(s => s.Resource_Name))
            .ForMember(d => d.cellno, opt => opt.MapFrom(s => s.cellNo))
            .ForMember(d => d.shiftid, opt => opt.MapFrom(s => s.ShiftId))
            .ForMember(d => d.provinceid, opt => opt.MapFrom(s => s.ProvinceId))
            .ForMember(d => d.regionid, opt => opt.MapFrom(s => s.RegionId))
            .ForMember(d => d.districtid, opt => opt.MapFrom(s => s.DistrictId))
            .ForMember(d => d.divisionid, opt => opt.MapFrom(s => s.DivisionId))
            .ForMember(d => d.circleid, opt => opt.MapFrom(s => s.CircleId))
            .ForMember(d => d.beatid, opt => opt.MapFrom(s => s.BeatId));

            CreateMap<UserViewModel, CMSUser>()
             .ForMember(d => d.Id, opt => opt.MapFrom(s => s.id))
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.username))
            .ForMember(d => d.Email, opt => opt.MapFrom(s => s.email))
            .ForMember(d => d.Resource_Name, opt => opt.MapFrom(s => s.resourcename))
            .ForMember(d => d.cellNo, opt => opt.MapFrom(s => s.cellno))
            .ForMember(d => d.ShiftId, opt => opt.MapFrom(s => s.shiftid))
            .ForMember(d => d.ProvinceId, opt => opt.MapFrom(s => s.provinceid))
            .ForMember(d => d.RegionId, opt => opt.MapFrom(s => s.regionid))
            .ForMember(d => d.DistrictId, opt => opt.MapFrom(s => s.districtid))
            .ForMember(d => d.DivisionId, opt => opt.MapFrom(s => s.divisionid))
            .ForMember(d => d.CircleId, opt => opt.MapFrom(s => s.circleid))
            .ForMember(d => d.BeatId, opt => opt.MapFrom(s => s.beatid));

            CreateMap<CMSUser, CMSUser>()
             .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.UserName))
            .ForMember(d => d.Email, opt => opt.MapFrom(s => s.Email))
            .ForMember(d => d.Resource_Name, opt => opt.MapFrom(s => s.Resource_Name))
            .ForMember(d => d.cellNo, opt => opt.MapFrom(s => s.cellNo))
            .ForMember(d => d.ShiftId, opt => opt.MapFrom(s => s.ShiftId))
            .ForMember(d => d.ProvinceId, opt => opt.MapFrom(s => s.ProvinceId))
            .ForMember(d => d.RegionId, opt => opt.MapFrom(s => s.RegionId))
            .ForMember(d => d.DistrictId, opt => opt.MapFrom(s => s.DistrictId))
            .ForMember(d => d.DivisionId, opt => opt.MapFrom(s => s.DistrictId))
            .ForMember(d => d.CircleId, opt => opt.MapFrom(s => s.CircleId))
            .ForMember(d => d.BeatId, opt => opt.MapFrom(s => s.BeatId));

            CreateMap<IdentityRole<int>, RoleViewModel>()
                .ForMember(d => d.id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.rolename, opt => opt.MapFrom(s => s.Name));
            CreateMap<sp_GetAllDropDownList, DropDownListViewModel>();
        }
    }
}
