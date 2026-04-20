using System.Net;

namespace CruiseHousing.Api.Exceptions;

public class UnauthorizedException : AppException
{
    public UnauthorizedException(
        string message = "Authentication is required.",
        string errorCode = "UNAUTHORIZED")
        : base(message, (int)HttpStatusCode.Unauthorized, errorCode)
    {
    }
}