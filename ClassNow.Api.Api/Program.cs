using ClassNow.Api.Aplicacao.Interface;
using ClassNow.Api.Repositorio.Interface;
using ClassNow.Api.Aplicacao.Aplicacao;
using ClassNow.Api.Repositorio.Repositorio;
using ClassNow.Api.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IProfessorAplicacao, ProfessorAplicacao>();
builder.Services.AddScoped<IProfessorRepositorio, ProfessorRepositorio>();

builder.Services.AddScoped<ICursoAplicacao, CursoAplicacao>();
builder.Services.AddScoped<ICursoRepositorio, CursoRepositorio>();

builder.Services.AddScoped<IAlunoAplicacao, AlunoAplicacao>();
builder.Services.AddScoped<IAlunoRepositorio, AlunoRepositorio>();

builder.Services.AddControllers();

builder.Services.AddDbContext<ClassNowContexto>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
            builder => builder.WithOrigins("http://localhost:3000")  // Troque para o seu domínio ou "*" para permitir de qualquer origem
                              .AllowAnyMethod()
                              .AllowAnyHeader());
    });

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowSpecificOrigin");
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

