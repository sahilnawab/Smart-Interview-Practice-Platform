using Confluent.Kafka;
using System.Text.Json;

namespace SmartInterviewAPI.Services.Implementation
{
    public class KafkaProducerService
    {
        private readonly string _bootstrapServers;
        private readonly ILogger<KafkaProducerService> _logger;

        public KafkaProducerService(IConfiguration config, ILogger<KafkaProducerService> logger)
        {
            _bootstrapServers = config["Kafka:BootstrapServers"]!;
            _logger = logger;
        }

        public async Task SendMessageAsync<T>(string topic, T data)
        {
            var config = new ProducerConfig { BootstrapServers = _bootstrapServers };

            using var producer = new ProducerBuilder<Null, string>(config).Build();
            var message = new Message<Null, string>
            {
                Value = JsonSerializer.Serialize(data)
            };
            try
            {
                var deliveryResult = await producer.ProduceAsync(topic, message);
                _logger.LogInformation($"Sent message to {topic}: {deliveryResult.Value}");

            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
            }
        }
    }
}
