using Microsoft.EntityFrameworkCore;
using SmartInterview.AIWorker;
using SmartInterview.AIWorker.Services;
using SmartInterviewAPI.Data;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHttpClient();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHostedService<Worker>();
builder.Services.AddScoped<IAIEvaluationService, AIEvaluationService>();

var host = builder.Build();
host.Run();
