using System.Net;

namespace CruiseHousing.Api.Exceptions;

public class NotFoundException : AppException
{
    public NotFoundException(
        string message = "Resource not found.",
        string errorCode = "NOT_FOUND")
        : base(message, (int)HttpStatusCode.NotFound, errorCode)
    {
    }
}