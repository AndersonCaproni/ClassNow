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
            builder => builder.WithOrigins("http://192.168.0.217:3000")  
                              .AllowAnyMethod()
                              .AllowAnyHeader());
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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

