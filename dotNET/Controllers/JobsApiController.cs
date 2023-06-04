using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Domain.TechCompanies;
using Sabio.Models.Requests.Friends;
using Sabio.Models.Requests.Jobs;
using Sabio.Models.Requests.TechCompanies;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;



namespace Sabio.Web.Api.Controllers
{
    [Route("api/jobs")]
    [ApiController]
    public class JobsApiController : BaseApiController
    {
        private IJobsService _service = null;
        private IAuthenticationService<int> _authService = null;

        public JobsApiController(
        IJobsService service,
        ILogger<JobsApiController> logger,
        IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Job>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Job> list = _service.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Jobs on the Database");
                }
                else
                {
                    response = new ItemsResponse<Job> { Items = list };
                }

            }
            catch (Exception exception)
            {
                code = 500;
                base.Logger.LogError(exception.ToString());

                response = new ErrorResponse(exception.Message);
            }



            return StatusCode(code, response);
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Job>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Job job = _service.Get(id);

                if (job == null)
                {
                    code = 404;
                    response = new ErrorResponse("Job not Found");
                }
                else
                {
                    response = new ItemResponse<Job> { Item = job };

                }

            }
            catch (Exception exception)
            {
                code = 500;
                base.Logger.LogError(exception.ToString());

                response = new ErrorResponse($"Generic Error: {exception.Message}");
            }

            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Job>>> GetPaginated(int PageIndex, int PageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Job> page = _service.GetPage(PageIndex, PageSize);


                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Jobs not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Job>> { Item = page };
                }

            }
            catch (Exception ex)
            {
                code = 500;

                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }



            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Job>>> SearchPaginated(int PageIndex, int PageSize, string Query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Job> page = _service.SearchPage(PageIndex, PageSize, Query);


                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Jobs not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Job>> { Item = page };
                }

            }
            catch (Exception ex)
            {
                code = 500;

                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }



            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(JobsAddRequest model)
        {

            IUserAuthData user = _authService.GetCurrentUser();

            int code = 200;
            BaseResponse response = null;


            try
            {
                int id = _service.Add(model, user.Id);

                code = 201;
                response = new ItemResponse<int> { Item = id };
            }
            catch (Exception exception)
            {
                code = 500;
                base.Logger.LogError(exception.ToString());

                response = new ErrorResponse(exception.Message);
            }


            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(JobsUpdateRequest model)
        {
            IUserAuthData user = _authService.GetCurrentUser();


            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model, user.Id);

                response = new SuccessResponse();
            }
            catch (Exception exception)
            {
                code = 500;
                response = new ErrorResponse(exception.Message);
                base.Logger.LogError(exception.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();

            }
            catch (Exception exception)
            {
                code = 500;
                response = new ErrorResponse(exception.Message);
                base.Logger.LogError(exception.ToString());
            }

            return StatusCode(code, response);
        }
    }
}
