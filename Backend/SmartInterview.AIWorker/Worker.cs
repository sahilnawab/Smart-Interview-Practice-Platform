using Confluent.Kafka;
using SmartInterview.AIWorker.Models;
using SmartInterview.AIWorker.Services;
using System.Text.Json;

namespace SmartInterview.AIWorker;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly string topic = "answer-submitted";
    private readonly string kafkaServer = "localhost:9092";

    public Worker(ILogger<Worker> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var config = new ConsumerConfig
        {
            GroupId = "smart-interview-ai-group",
            BootstrapServers = kafkaServer,
            AutoOffsetReset = AutoOffsetReset.Earliest
        };

        using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
        consumer.Subscribe(topic);

        _logger.LogInformation("AI Worker started. Listening for messages...");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var result = consumer.Consume(stoppingToken);
                var json = result.Message.Value;

                var payload = JsonSerializer.Deserialize<AnswerKafkaMessage>(json);

                using var scope = _serviceProvider.CreateScope();
                var aiService = scope.ServiceProvider.GetRequiredService<IAIEvaluationService>();
                await aiService.EvaluateAnswerAsync(payload!);
            }
            catch (Exception ex) { 
            
                     _logger.LogError(ex, "Error processing Kafka message");
            }
        }
    }
}
