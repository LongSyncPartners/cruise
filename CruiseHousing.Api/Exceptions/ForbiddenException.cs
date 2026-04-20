using System.Net;

namespace CruiseHousing.Api.Exceptions;

public class ForbiddenException : AppException
{
    public ForbiddenException(
        string message = "You do not have permission to perform this action.",
        string errorCode = "FORBIDDEN")
        : base(message, (int)HttpStatusCode.Forbidden, errorCode)
    {
    }
}