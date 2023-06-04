using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Concerts;
using Sabio.Models.Domain.Friends;
using System.Data.SqlClient;
using System.Data;
using Sabio.Data;
using Sabio.Models.Requests.Concerts;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Friends;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class ConcertService
    {
        IDataProvider _data = null;

        public ConcertService (IDataProvider data)
        {
            _data = data;
        }

        public Concert GetById (int id)
        {
            Concert concert = null;

            string procedureName = "[dbo].[Concerts_SelectById]";

            _data.ExecuteCmd(procedureName, delegate (SqlParameterCollection parameterCollection)
            {

                parameterCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {
                concert = SingleConcertMapper(reader);

            });



            return concert;
        }


        public List<Concert> GetAll()
        {
            List<Concert> concertList = null;

            string procedureName = "[dbo].[Concerts_SelectAll]";

            _data.ExecuteCmd(procedureName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Concert singleConcert = SingleConcertMapper(reader);

                if (concertList == null)
                {
                    concertList = new List<Concert>();
                }

                concertList.Add(singleConcert);
            });

            return concertList;
        }


        public int Add (ConcertAddRequest modelConcert)
        {
            int id = 0;

            string procedureName = "[dbo].[Concerts_Insert]";

            _data.ExecuteNonQuery(
            procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(modelConcert, collection);


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

        public void Update (ConcertUpdateRequest modelConcert)
        {
            string procedureName = "[dbo].[Concerts_Update]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {

                AddCommonParams(modelConcert, collection);


                collection.AddWithValue("@Id", modelConcert.Id);


            },
            returnParameters: null);

        }


        public void Delete(int id)
        {
            string procedureName = "[dbo].[Concerts_Delete]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);

            },
            returnParameters: null);

        }



        private static Concert SingleConcertMapper(IDataReader reader)
        {
            Concert singleConcert = new Concert();

            int startingIndex = 0;

            singleConcert.Id = reader.GetSafeInt32(startingIndex++);
            singleConcert.Name = reader.GetSafeString(startingIndex++);
            singleConcert.Description = reader.GetSafeString(startingIndex++);
            singleConcert.IsFree = reader.GetSafeBool(startingIndex++);
            singleConcert.Address = reader.GetSafeString(startingIndex++);
            singleConcert.Cost = reader.GetSafeInt32(startingIndex++);
            singleConcert.DateOfEvent = reader.GetSafeDateTime(startingIndex++);


            return singleConcert;
        }


        private static void AddCommonParams(ConcertAddRequest modelConcert, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Name", modelConcert.Name);
            collection.AddWithValue("@Description", modelConcert.Description);
            collection.AddWithValue("@IsFree", modelConcert.IsFree);
            collection.AddWithValue("@Address", modelConcert.Address);
            collection.AddWithValue("@Cost", modelConcert.Cost);
            collection.AddWithValue("@DateOfEvent", modelConcert.DateOfEvent);
 

        }




    }
}
