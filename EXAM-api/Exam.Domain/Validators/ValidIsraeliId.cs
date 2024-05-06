using System.ComponentModel.DataAnnotations;

namespace Exam.Domain.Validators;

public class ValidIsraelIdAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
        {
            return new ValidationResult("sraeli ID should not be empty.");
        }

        string id = value.ToString().Replace("-", "").Replace(" ", "");

        if (id.Length != 9)
        {
            return new ValidationResult("Israeli ID must be 9 digits long.");
        }

        if (!long.TryParse(id, out _))
        {
            return new ValidationResult("Israeli ID must contain only digits.");
        }

        if (!IsValidIsraeliId(id))
        {
            return new ValidationResult("Invalid Israeli ID.");
        }

        return ValidationResult.Success;
    }

    private bool IsValidIsraeliId(string id)
    {
        int sum = 0;
        for (int i = 0; i < 8; i++)
        {
            int digit = int.Parse(id[i].ToString());
            sum += (i % 2 == 0) ? digit : ((digit * 2 > 9) ? digit * 2 - 9 : digit * 2);
        }
        return (sum + int.Parse(id[8].ToString())) % 10 == 0;
    }
}

