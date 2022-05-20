using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDSACW.Application.Features.IdentifyShortestPath.Commands;

namespace PDSACW.WebApi.Controllers
{

    public class ShortestPathController : BaseApiController
    {
        [HttpPost("shortestpath", Name = "CheckTheAnswer")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<OkObjectResult> CheckTheAnswer([FromBody] IdentifyShortestPathCommand command)
        {

            return Ok(await Mediator.Send(command));

        }

    }
}
