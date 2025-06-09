using OpenAI;
using OpenAI.Chat;
using SmartInterview.AIWorker.Models;
using SmartInterviewAPI.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions; // Added for Regex
using System.Threading.Tasks;

namespace SmartInterview.AIWorker.Services
{
    public interface IAIEvaluationService
    {
        Task EvaluateAnswerAsync(AnswerKafkaMessage message);
    }


        public class AIEvaluationService : IAIEvaluationService
        {
            private readonly ApplicationDbContext _context;
            private readonly IHttpClientFactory _httpClientFactory;
            private readonly string _apiKey;

            public AIEvaluationService(ApplicationDbContext context, IHttpClientFactory httpClientFactory, IConfiguration config)
            {
                _context = context;
                _httpClientFactory = httpClientFactory;
                _apiKey = config["GooglePaLM:ApiKey"]!;
            }

            public async Task EvaluateAnswerAsync(AnswerKafkaMessage message)
            {
                var attempt = await _context.UserAttempts.FindAsync(message.AttemptId);
                if (attempt == null) return;

            var client = _httpClientFactory.CreateClient();
            //var url = $"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={_apiKey}";
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={_apiKey}";

            var prompt = $"Evaluate the following interview answer: \"{message.SubmittedAnswer}\" for this question \"{message.Question}\". Provide feedback     and a score from 0 to 10.";

            var body = new
            {
                contents = new[]
                {
        new
        {
            role = "user",
            parts = new[]
            {
                new { text = prompt }
            }
        }
    }
            };

            var json = JsonSerializer.Serialize(body);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(url, content);
            var resultText = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var result = JsonSerializer.Deserialize<GeminiResponse>(resultText);
                var output = result?.candidates?.FirstOrDefault()?.content?.parts?.FirstOrDefault()?.text ?? "No feedback.";

                attempt.Feedback = output;
                attempt.Score = ExtractScore(output);
                await _context.SaveChangesAsync();
            }
            else
            {
                attempt.Feedback = $"Evaluation failed (Gemini): {resultText}";
                attempt.Score = 0;
                await _context.SaveChangesAsync();
            }
        }

            private int ExtractScore(string feedback)
            {
                var match = Regex.Match(feedback, @"Score[:\s]+(\d{1,2})");
                return match.Success && int.TryParse(match.Groups[1].Value, out int result) ? result : 0;
            }
        }
    
}