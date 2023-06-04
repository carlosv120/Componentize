using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.TechCompanies;
using Sabio.Models.Requests.Friends;
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
    [Route("api/techCompanies")]
    [ApiController]
    public class TechCompaniesController : BaseApiController
    {
        private ITechCompaniesService _service = null;
        private IAuthenticationService<int> _authService = null;

        public TechCompaniesController(
        ITechCompaniesService service, 
        ILogger<TechCompaniesController> logger,
        IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<TechCompany>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                TechCompany company = _service.Get(id);

                if (company == null)
                {
                    code = 404;
                    response = new ErrorResponse("TechCompany not Found");
                }
                else
                {
                    response = new ItemResponse<TechCompany> { Item = company };

                }

            }
            catch (Exception exception)
            {
                code = 500;
                base.Logger.LogError(exception.ToString());

                response = new ErrorResponse($"Generic Error: {exception.Message}");
            }

            return StatusCode(code,response);
        }

        [HttpGet]
        public ActionResult<ItemsResponse<TechCompany>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<TechCompany> list = _service.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No TechCompanies on the Database");
                }
                else
                {
                    response = new ItemsResponse<TechCompany> { Items = list };
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

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<TechCompany>>> GetPaginated(int PageIndex, int PageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<TechCompany> page = _service.GetPage(PageIndex, PageSize);


                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Friends not found");
                }
                else
                {
                    response = new ItemResponse<Paged<TechCompany>> { Item = page };
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
        public ActionResult<ItemResponse<Paged<TechCompany>>> SearchPaginated(int PageIndex, int PageSize, string Query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<TechCompany> page = _service.SearchPage(PageIndex, PageSize, Query);


                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Company not found");
                }
                else
                {
                    response = new ItemResponse<Paged<TechCompany>> { Item = page };
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
        public ActionResult<ItemResponse<int>> Create(TechCompaniesAddRequest model)
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
        public ActionResult<SuccessResponse> Update(TechCompaniesUpdateRequest model)
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
