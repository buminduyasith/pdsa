using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PDSACW.Application.Common.Interfaces;


namespace PDSACW.Application.Features.Common.Query
{
    public class SigninUserQueryValidator : AbstractValidator<SigninUserQuery>
    {
        private readonly IApplicationDbContext _context;

        public SigninUserQueryValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.UserName)
                .NotEmpty().WithMessage("UserName is required.")
                .MaximumLength(200).WithMessage("UserName must not exceed 200 characters.")
                .MustAsync(BeUniqueUserName).WithMessage("username is not available. please sign up");

            RuleFor(v => v.Password)
               .NotEmpty().WithMessage("Password is required.")
               .MinimumLength(6).WithMessage("Password must have at least 6 characters.")
               .MaximumLength(10).WithMessage("Password must not exceed 10 characters.");
        }

        public async Task<bool> BeUniqueUserName(string userName, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AllAsync(l => l.UserName == userName, cancellationToken);
        }
    }
}
