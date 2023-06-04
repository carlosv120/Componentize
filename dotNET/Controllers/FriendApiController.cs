using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
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
    [Route("api/friends")]
    [ApiController]
    public class FriendApiController : BaseApiController
    {
        private IFriendService _service = null;
        private IAuthenticationService<int> _authService = null;

        public FriendApiController(IFriendService service, ILogger<FriendApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Friend>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Friend singleFriend = _service.Get(id);

                if (singleFriend == null)
                {
                    code = 404;
                    response = new ErrorResponse("Friend not found");
                }
                else
                {
                    response = new ItemResponse<Friend> { Item = singleFriend };
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


        /*        [HttpGet("{id:int}")]
                public ActionResult<ItemResponse<Friend>> GetById(int id)
                {
                    int code = 200;
                    BaseResponse response = null;

                    try
                    {
                        Friend singleFriend = _service.GetByIdJSON(id);

                        if (singleFriend == null)
                        {
                            code = 404;
                            response = new ErrorResponse("Friend not found");
                        }
                        else
                        {
                            response = new ItemResponse<Friend> { Item = singleFriend };
                        }

                    }
                    catch (Exception exception)
                    {
                        code = 500;
                        base.Logger.LogError(exception.ToString());

                        response = new ErrorResponse($"Generic Error: {exception.Message}");
                    }

                    return StatusCode(code, response);

                }*/





        [HttpGet]
        public ActionResult<ItemsResponse<Friend>> GetAll() 
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Friend> list = _service.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("No Friends on the Database");
                }
                else
                {
                    response = new ItemsResponse<Friend> { Items = list };
                }
            }
            catch(Exception exception)
            {
                code = 500;
                base.Logger.LogError(exception.ToString());

                response = new ErrorResponse(exception.Message);
            }

            return StatusCode(code, response);
        }



        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(FriendAddRequest model)
        {
            //Bringing Current User Information
            IUserAuthData user = _authService.GetCurrentUser();


            //Defining Default Response
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
        public ActionResult<SuccessResponse> Update(FriendUpdateRequest model)
        {
            IUserAuthData user = _authService.GetCurrentUser();


            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model,user.Id);

                response = new SuccessResponse();
            }
            catch(Exception exception)
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
            catch(Exception exception)
            {
                code = 500;
                response = new ErrorResponse(exception.Message);
                base.Logger.LogError(exception.ToString());
            }

            return StatusCode(code, response);
        }


        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Friend>>> Pagination(int PageIndex, int PageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Friend> page = _service.GetPage(PageIndex, PageSize);


                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Friends not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Friend>> { Item = page };
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
