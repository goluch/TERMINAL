using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Terminal.Backend.Application.Abstractions;

public interface IUserService
{
    Task RegisterAsync(string email, string password);

    Task<Results<Ok<AccessTokenResponse>, EmptyHttpResult>> SignInAsync(
        string email,
        string password,
        string? twoFactorCode,
        string? twoFactorRecoveryCode,
        bool useCookies = true,
        bool useSessionCookies = true);

    Task SignOutAsync();
}