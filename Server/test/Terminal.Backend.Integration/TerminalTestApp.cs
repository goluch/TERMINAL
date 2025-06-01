using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Terminal.Backend.Api;

namespace Terminal.Backend.Integration;

internal sealed class TerminalTestApp : WebApplicationFactory<Program>
{
    public HttpClient Client { get; }

    public TerminalTestApp(Action<IServiceCollection>? services = null)
    {
        Client = WithWebHostBuilder(builder =>
        {
            if (services is not null)
            {
                builder.ConfigureServices(services);
            }
            builder.ConfigureAppConfiguration(b=>
            {
                b.SetBasePath(AppContext.BaseDirectory)
                    .AddJsonFile("appsettings.Test.json")
                    .AddEnvironmentVariables()
                    .Build();
            });
            builder.UseEnvironment("test");
        }).CreateClient();
    }
}