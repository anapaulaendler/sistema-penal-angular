using Microsoft.EntityFrameworkCore;
using SistemaPenal.Context;
using SistemaPenal.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IUnitOfWork, AppUnitOfWork>();

// ana: as ABSTRATAS (Pessoa, Atividade) não precisam disso aqui embaixo!
// MODELO:
// builder.Services.AddScoped<IEntidadeRepository, EntidadeRepository>();
// builder.Services.AddScoped<IEntidadeService, EntidadeService>();
// builder.Services.AddAutoMapper(typeof(EntidadeService).Assembly);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

var conectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(x => x.UseMySql(conectionString, ServerVersion.AutoDetect(conectionString)));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();