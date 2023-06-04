using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using System.Net;
using Sabio.Models.Requests.Addresses;
using Sabio.Models.Domain.Addresses;
using Sabio.Services.Interfaces;
using Sabio.Models;
using System.Reflection;

namespace Sabio.Services
{
    public class AddressService : IAddressService
    {

        IDataProvider _data = null;

        public void Update(AddressUpdateRequest modelAddress)
        {
            string procedureName = "[dbo].[Sabio_Addresses_Update]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(modelAddress, collection);

                collection.AddWithValue("@Id", modelAddress.Id);


            },
            returnParameters: null);
        }

        public AddressService(IDataProvider data)
        {
            _data = data;

        }

        public int Add(AddressAddRequest modelAddress, int userId)
        {
            int id = 0;


            string procedureName = "[dbo].[Sabio_Addresses_Insert]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(modelAddress, collection);

                //The Id is the ouput, 1 output


                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                collection.Add(idOut);

            },
            returnParameters: delegate (SqlParameterCollection returnColection)
            {
                object objectId = returnColection["@Id"].Value;

                int.TryParse(objectId.ToString(), out id);



            });



            return id;
        }

        public Address Get(int id)
        {

            Address address = null;

            string procedureName = "[dbo].[Sabio_Addresses_SelectById]";


            if (id > 100000) { throw new ArgumentOutOfRangeException("This id is out of range"); };

            _data.ExecuteCmd(procedureName, delegate (SqlParameterCollection parameterCollection)
            {

                parameterCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {


                address = MapSingleAddress(reader);


            });


            return address;
        }

        public void Delete(int id)
        {
            string procedureName = "[dbo].[Sabio_Addresses_DeleteById]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);

            },
            returnParameters: null);


        }

        public List<Address> GetRandomAddresses() //list is similar to an array
        {
            List<Address> list = null;

            string procedureName = "[dbo].[Sabio_Addresses_SelectRandom50]";

            _data.ExecuteCmd(procedureName, inputParamMapper: null
           , singleRecordMapper: delegate (IDataReader reader, short set)
           {
               Address singleAddress = MapSingleAddress(reader);

               if (list == null)
               {
                   list = new List<Address>();
               }

               list.Add(singleAddress);
           });



            return list;
        }

        public Paged<Address> GetPage(int PageIndex, int PageSize)
        {
            Paged<Address> paginatedlist = null;
            List<Address> list = null;

            int totalCount = 0;
            string procedureName = "dbo.Sabio_Addresses_Pagination";

            _data.ExecuteCmd(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@PageIndex", PageIndex);
                collection.AddWithValue("@PageSize", PageSize);

            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Address singleAddress = new Address();

                singleAddress = MapSingleAddress(reader);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(9);
                }

                if (list == null)
                {
                    list = new List<Address>();
                }

                list.Add(singleAddress);
            });

            if (list != null)
            {
                paginatedlist = new Paged<Address>(list,PageIndex,PageSize,totalCount);
            }

            return paginatedlist;
        }


        private static Address MapSingleAddress(IDataReader reader)
        {
            Address singleAddress = new Address();

            int startingIndex = 0;

            singleAddress.Id = reader.GetSafeInt32(startingIndex++);
            singleAddress.LineOne = reader.GetSafeString(startingIndex++);
            singleAddress.SuiteNumber = reader.GetSafeInt32(startingIndex++);
            singleAddress.City = reader.GetSafeString(startingIndex++);
            singleAddress.State = reader.GetSafeString(startingIndex++);
            singleAddress.PostalCode = reader.GetSafeString(startingIndex++);
            singleAddress.IsActive = reader.GetSafeBool(startingIndex++);
            singleAddress.Lat = reader.GetSafeDouble(startingIndex++);
            singleAddress.Long = reader.GetSafeDouble(startingIndex++);
            return singleAddress;
        }

        private static void AddCommonParams(AddressAddRequest modelAddress, SqlParameterCollection collection)
        {
            collection.AddWithValue("@LineOne", modelAddress.LineOne);
            collection.AddWithValue("@SuiteNumber", modelAddress.SuiteNumber);
            collection.AddWithValue("@City", modelAddress.City);
            collection.AddWithValue("@State", modelAddress.State);
            collection.AddWithValue("@PostalCode", modelAddress.PostalCode);
            collection.AddWithValue("@IsActive", modelAddress.IsActive);
            collection.AddWithValue("@Lat", modelAddress.Lat);
            collection.AddWithValue("@Long", modelAddress.Long);
        }

    }
}
