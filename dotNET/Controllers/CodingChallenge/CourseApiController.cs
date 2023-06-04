using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.CodingChallenge.Domain;
using Sabio.Models.CodingChallenge.Requests;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Jobs;
using Sabio.Services;
using Sabio.Services.CodingChallenge;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;


namespace Sabio.Web.Api.Controllers.CodingChallenge
{
    [Route("api/courses")]
    [ApiController]
    public class CourseApiController : BaseApiController
    {
        private ICourseService _service = null;
        private IAuthenticationService<int> _authService = null;


        public CourseApiController(
        ICourseService service,
        ILogger<CourseApiController> logger,
        IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CoursesAddRequest model)
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                int id = _service.Add(model);

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


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Course>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Course course = _service.GetCourseById(id);

                if (course == null)
                {
                    code = 404;
                    response = new ErrorResponse("Job not Found");
                }
                else
                {
                    response = new ItemResponse<Course> { Item = course };

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


        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CoursesUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateCourse(model);

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

        [HttpDelete("students/{id:int}")]
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

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Course>>> GetByPage(int PageIndex, int PageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Course> page = _service.GetCoursesByPage(PageIndex, PageSize);


                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Jobs not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Course>> { Item = page };
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

    }
}
