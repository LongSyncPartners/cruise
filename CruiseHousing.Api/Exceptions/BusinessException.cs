using System.Net;

namespace CruiseHousing.Api.Exceptions;

public class BusinessException : AppException
{
    public BusinessException(
        string message,
        string errorCode = "BUSINESS_ERROR")
        : base(message, (int)HttpStatusCode.BadRequest, errorCode)
    {
    }
}