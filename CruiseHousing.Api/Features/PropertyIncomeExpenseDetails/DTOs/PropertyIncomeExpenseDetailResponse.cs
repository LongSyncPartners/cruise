namespace CruiseHousing.Api.Features.PropertyIncomeExpenseDetails.DTOs;
public class PropertyIncomeExpenseDetailResponse
{
    public long Id { get; set; }
    public long PropertyId { get; set; }
    public DateOnly TransactionDate { get; set; }
    public string? Counterparty { get; set; }
    public string? Description { get; set; }
    public decimal IncomeAmount { get; set; }
    public decimal ExpenseAmount { get; set; }
    public decimal BalanceAmount { get; set; }
    public string? Note { get; set; }
    public int DisplayOrder { get; set; }
}