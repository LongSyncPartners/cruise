using System.Net;

namespace CruiseHousing.Api.Exceptions;

public class UnauthorizedAppException : AppException
{
    public UnauthorizedAppException(
        string message = "Authentication is required.",
        string errorCode = "UNAUTHORIZED")
        : base(message, (int)HttpStatusCode.Unauthorized, errorCode)
    {
    }
}