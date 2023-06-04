using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Addresses;
using Sabio.Models.Requests.Addresses;
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
    [Route("api/addresses")]
    [ApiController]
    public class AddressApiController : BaseApiController
    {


        //AUTHENTICATION
        private IAddressService _service = null;
        //private IAddressService _service ; //THIS ALSO WORKS


        private IAuthenticationService<int> _authService = null;
        public AddressApiController(IAddressService service, ILogger<AddressApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }





        // GET api/addresses
        [HttpGet("")]
        public ActionResult<  ItemsResponse<Address>  > GetAll()
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Address> list = _service.GetRandomAddresses();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found");

                }
                else
                {
                    response = new ItemsResponse<Address> { Items = list };
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



        // GET api/addresses/{id:int}
        [HttpGet("{id:int}")]
        public ActionResult<ItemsResponse<Address>> Get(int id) 
        {
            int iCode = 200;
            BaseResponse response = null;


            try
            {
                Address singleAddress = _service.Get(id);

                //ItemResponse<Address> response = new ItemResponse<Address>();
                //response.Item = singleAddress;


                if (singleAddress == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Address not found");

                }
                else
                {
                    response = new ItemResponse<Address>{Item = singleAddress };
                }

            }
            catch (SqlException SqlException)
            {

                iCode = 500;
                response = new ErrorResponse($"SqlException Error: {SqlException.Message}");
                base.Logger.LogError(SqlException.ToString());

            }
            catch (ArgumentException argumentException)
            {

                iCode = 500;

                response = new ErrorResponse($"Argument Error: {argumentException.Message}");


            }
            catch (Exception exception) 
            {
                iCode = 500;

                base.Logger.LogError(exception.ToString());
                response = new ErrorResponse($"Generic Error: {exception.Message}");
            }

            return StatusCode(iCode, response);
        }

        public ActionResult<ItemsResponse<Address>> GetV1(int id)
        {

            try
            {
                Address singleAddress = _service.Get(id);

                ItemResponse<Address> response = new ItemResponse<Address>();
                response.Item = singleAddress;


                if (singleAddress == null)
                {
                    return NotFound404(response);
                }
                else
                {
                    return Ok(response);
                }

            }
            catch (SqlException argumentException)
            {
                //another clean up code or logging to do.

                return base.StatusCode(500, new ErrorResponse($"Generic Error: {argumentException.Message}"));

            }
            catch (ArgumentException argumentException)
            {
                //another clean up code or logging to do.

                return base.StatusCode(500, new ErrorResponse($"Generic Error: {argumentException.Message}"));

            }
            catch (Exception exception)
            {

                base.Logger.LogError(exception.ToString());
                return base.StatusCode(500, new ErrorResponse($"Generic Error: {exception.Message}"));
            }


        }


        // DELETE api/addresses/{id:int}
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
                //throw;
            }

            return StatusCode(code,response);
        }



        // POST api/addresses
        [HttpPost] //same as Get
        public ActionResult<ItemResponse<int>> Create(AddressAddRequest model)
        {
            //Bringing the entire current user object

            IUserAuthData user = _authService.GetCurrentUser();
            int id = _service.Add(model, user.Id);

            // Another form
            // int userId = _authService.GetCurrentUserId();
            // int id = _service.Add(model, userId);


            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = id;

            return Created201(response);
        }



        // PUT api/addresses/{id:int}
        [HttpPut("{id:int}")] //same as Get
        public ActionResult<SuccessResponse> Update(AddressUpdateRequest model)
        {
            _service.Update(model);

            SuccessResponse response = new SuccessResponse();


            return Ok(response);
        }


        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Address>>> Pagination(int PageIndex, int PageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Address> page = _service.GetPage(PageIndex, PageSize);


                if(page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Addresses not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Address>> { Item = page };
                }

            }
            catch(Exception ex) 
            {
                code = 500;

                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }



            return StatusCode(code, response);
        }

    }
}
