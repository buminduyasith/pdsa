using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDSACW.Application.Features.IdentifyShortestPath.Queries;
using PDSACW.Application.Features.Common.Commands;
using PDSACW.Application.ViewModels;
using PDSACW.Application.Features.Common.Query;

namespace PDSACW.WebApi.Controllers
{
    public class GameController : BaseApiController
    {
        
        [HttpPost("signup", Name = "CreateUser")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<OkObjectResult> CreateUser([FromBody] CreateUserCommand command)
        {

            return Ok( await Mediator.Send(command));

        }

        [HttpPost("signin", Name = "UserLogin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<OkObjectResult> Login([FromBody] SigninUserQuery  query)
        {

            return Ok(await Mediator.Send(query));

        }

    }
}
