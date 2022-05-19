using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PDSACW.Application.Common.Interfaces;

namespace PDSACW.Application.Features.Common.Commands
{

    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        private readonly IApplicationDbContext _context;

        public CreateUserCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.UserName)
                .NotEmpty().WithMessage("UserName is required.")
                .MaximumLength(200).WithMessage("UserName must not exceed 200 characters.")
                .MustAsync(BeUniqueUserName).WithMessage("The given UserName already exists.");
        }

        public async Task<bool> BeUniqueUserName(string userName, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AllAsync(l => l.UserName != userName, cancellationToken);
        }
    }
}
