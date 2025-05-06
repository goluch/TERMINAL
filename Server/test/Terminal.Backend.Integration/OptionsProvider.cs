using Microsoft.Extensions.Configuration;

namespace Terminal.Backend.Integration;

public sealed class OptionsProvider
{
    private readonly IConfigurationRoot _configuration = GetConfigurationRoot();

    public T Get<T>(string sectionName) where T : class, new() => _configuration.GetSection(sectionName).Get<T>()!;

    public static IConfigurationRoot GetConfigurationRoot()
        => new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.Test.json")
            .AddEnvironmentVariables()
            .Build();
}