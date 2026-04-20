namespace CruiseHousing.Api.RabbitMQ
{
    public class RabbitMqSetting
    {
        public string HostName { get; set; } = "localhost";
        public int Port { get; set; } = 5672;
        public string UserName { get; set; } = "admin";
        public string Password { get; set; } = "123456";
        public string VirtualHost { get; set; } = "/";
        public string JobQueueName { get; set; } = "job_queue";
    }
}
