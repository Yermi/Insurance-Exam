using Data;
using Exam.Core.Interfaces;
using Exam.Services.mappers;
using Exam.Services.Services;
using Exam.WebApi.Middlewares;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("WebApiDatabase"), b => b.MigrationsAssembly("Exam.WebApi")));
builder.Services.AddAutoMapper(typeof(GeneralMapper).Assembly);

// Repositories and services registration
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IInsurancePolicyRepository, InsurancePolicyRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors((policy) => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.Run();
