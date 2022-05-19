using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDSACW.Application.Features.IdentifyShortestPath.Queries;
using PDSACW.Application.ViewModels;

namespace PDSACW.WebApi.Controllers
{
    public class GameController : BaseApiController
    {
        [HttpGet("shortestPath", Name = "shortestPathTest")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<UserVM>>> Test()
        {
            var result = await Mediator.Send(new GetAllUsersQuery());
            return Ok(result);
        }

    }
}
