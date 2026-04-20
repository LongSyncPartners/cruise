using System.Net;

namespace CruiseHousing.Api.Exceptions;

public class ValidationException : AppException
{
    public IDictionary<string, string[]> Errors { get; }

    public ValidationException(
        string message,
        IDictionary<string, string[]>? errors = null,
        string errorCode = "VALIDATION_ERROR")
        : base(message, (int)HttpStatusCode.BadRequest, errorCode)
    {
        Errors = errors ?? new Dictionary<string, string[]>();
    }
}