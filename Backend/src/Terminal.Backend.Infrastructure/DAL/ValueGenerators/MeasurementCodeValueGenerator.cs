using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Terminal.Backend.Core.ValueObjects;

namespace Terminal.Backend.Infrastructure.DAL.ValueGenerators;

internal sealed class MeasurementCodeValueGenerator : ValueGenerator<SampleCode>
{
    public override bool GeneratesTemporaryValues => false;
    
    private const ulong InitialNumberValue = 1;
    
    public override SampleCode Next(EntityEntry entry)
    {
        var dbContext = entry.Context as TerminalDbContext ?? throw new InvalidDataException(); // FIXME
        var lastCodeNumber = dbContext.Measurements
            .OrderBy(m => m.Code)
            .Select(m => m.Code)
            .LastOrDefault()?.Number;
        
        return lastCodeNumber is null
            ? new SampleCode(InitialNumberValue)
            : new SampleCode((ulong)(lastCodeNumber + 1));
    }

    public override async ValueTask<SampleCode> NextAsync(EntityEntry entry, CancellationToken ct = default)
    {
        var dbContext = entry.Context as TerminalDbContext ?? throw new InvalidDataException(); // FIXME
        var lastCodeNumber = (await dbContext.Measurements.OrderBy(m => m.Code).LastOrDefaultAsync(ct))
            ?.Code.Number;
        
        return lastCodeNumber is null ? new SampleCode(InitialNumberValue) : new SampleCode((ulong)(lastCodeNumber + 1));
    }
}