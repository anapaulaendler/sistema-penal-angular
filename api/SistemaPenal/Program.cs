using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SistemaPenal.Context;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Interfaces.Services.Entities;
using SistemaPenal.Repositories.Entities;
using SistemaPenal.Seed;
using SistemaPenal.Services.Entities;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

#region DI

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

#endregion DI

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

var conectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(x => x.UseSqlite(builder.Configuration.GetConnectionString(nameof(AppDbContext))));

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
                Encoding.UTF8.GetBytes(chaveJwt!)),
            RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        SeedData.Initialize(services);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();