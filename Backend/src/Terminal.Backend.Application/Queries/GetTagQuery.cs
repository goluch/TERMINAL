using MediatR;
using Terminal.Backend.Application.DTO;

namespace Terminal.Backend.Application.Queries;

public class GetTagQuery : IRequest<GetTagDto?>
{
    public Guid TagId { get; set; }
}