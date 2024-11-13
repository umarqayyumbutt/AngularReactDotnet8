namespace CPO.CMSAPI.Services.Interfaces
{
    public interface ILoggingService
    {
        Task LogErrorAsync(Exception ex, string userId, string userName);
    }
}
