namespace InvelopApp.Server.Application.Common
{
    public class ErrorResponse
    {
        public bool Success { get; set; } = false;
        public string? Message { get; set; }
        public object? Errors { get; set; }
        public string? Details { get; set; }
    }
}
