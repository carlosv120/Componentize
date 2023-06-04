using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
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
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController
    {

        private IUserServiceV1 _service = null;

        private IAuthenticationService<int> _authService = null;
        public UserApiController(IUserServiceV1 service, ILogger<UserApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }



        [HttpGet("{id:int}")]
        public ActionResult<ItemsResponse<User>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;


            try
            {
                User singleUser = _service.Get(id);
                

                if (singleUser == null)
                {
                    code = 404;
                    response = new ErrorResponse("User not found");

                }
                else
                {
                    response = new ItemResponse<User> { Item = singleUser };
                }

            }catch (Exception exception)
            {
                code = 500;

                base.Logger.LogError(exception.ToString());
                response = new ErrorResponse($"Generic Error: {exception.Message}");
            }

            return StatusCode(code, response);
        }


        [HttpGet("")]
        public ActionResult<ItemsResponse<User>> GetAll()
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                List<User> list = _service.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found");

                }
                else
                {
                    response = new ItemsResponse<User> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }

            return StatusCode(code, response);

        }


        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest model)
        {

            int code = 200;
            BaseResponse response = null;


            try
            {

                int id = _service.Add(model);

                code = 201;
                response = new ItemResponse<int> { Item = id };

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);
        }



        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(UserUpdateRequest model)
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);

                response = new SuccessResponse();

            }catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code,response);
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
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


    }
}
