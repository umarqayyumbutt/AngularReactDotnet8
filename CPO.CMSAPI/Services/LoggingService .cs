using CPO.CMSAPI.Interfaces;
using CPO.CMSAPI.Models;
using CPO.CMSAPI.Services.Interfaces;

namespace CPO.CMSAPI.Services
{
    public class LoggingService : ILoggingService
    {
        private readonly IUnitOfWork _unitOfWork;

        public LoggingService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task LogErrorAsync(Exception ex, string userId, string userName)
        {
            var errorLog = new ErrorLog
            {
                Message = ex.Message,
                StackTrace = ex.StackTrace,
                CreatedAt = DateTime.UtcNow,
                UserId = userId,
                UserName = userName
            };

            _unitOfWork.ErrorLogs.AddAsync(errorLog);
            await _unitOfWork.SaveAsync();
        }
    }
}
