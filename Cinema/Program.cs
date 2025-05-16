using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll");

app.ConfigureSessaoApi();
app.ConfigureUsuarioApi();
app.ConfigureIngressoApi();
app.ConfigureBomboniereApi();
app.ConfigureFilmeApi();
app.ConfigureSalaApi();

app.MapGet("/", () => "Cinema Api");

app.Run();