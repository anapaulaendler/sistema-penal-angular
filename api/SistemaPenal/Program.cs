using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SistemaPenal.Context;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Interfaces.Services.Entities;
using SistemaPenal.Repositories.Entities;
using SistemaPenal.Services.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IUnitOfWork, AppUnitOfWork>();

builder.Services.AddScoped<IPrisioneiroRepository, PrisioneiroRepository>();
builder.Services.AddScoped<IPrisioneiroService, PrisioneiroService>();
builder.Services.AddAutoMapper(typeof(PrisioneiroService).Assembly);

builder.Services.AddScoped<IFuncionarioRepository, FuncionarioRepository>();
builder.Services.AddScoped<IFuncionarioService, FuncionarioService>();
builder.Services.AddAutoMapper(typeof(FuncionarioService).Assembly);

builder.Services.AddScoped<IDiaDeTrabalhoRepository, DiaDeTrabalhoRepository>();
builder.Services.AddScoped<IDiaDeTrabalhoService, DiaDeTrabalhoService>();
builder.Services.AddAutoMapper(typeof(DiaDeTrabalhoService).Assembly);

builder.Services.AddScoped<IEstudoRepository, EstudoRepository>();
builder.Services.AddScoped<IEstudoService, EstudoService>();
builder.Services.AddAutoMapper(typeof(EstudoService).Assembly);

builder.Services.AddScoped<ILivroRepository, LivroRepository>();
builder.Services.AddScoped<ILivroService, LivroService>();
builder.Services.AddAutoMapper(typeof(LivroService).Assembly);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

var conectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(x => x.UseMySql(conectionString, ServerVersion.AutoDetect(conectionString)));

var chaveJwt = builder.Configuration["JwtSettings:SecretKey"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
						ClockSkew = TimeSpan.Zero,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(chaveJwt!))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();