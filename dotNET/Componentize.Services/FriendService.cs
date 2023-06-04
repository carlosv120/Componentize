using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Sabio.Data;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using Sabio.Models.Requests.Users;
using Sabio.Services.Interfaces;
using Sabio.Models;
using Sabio.Models.Domain.Addresses;

namespace Sabio.Services
{
    public class FriendService : IFriendService
    {
        IDataProvider _data = null;

        public FriendService(IDataProvider data)
        {
            _data = data;
        }

        public Friend Get(int id)
        {
            Friend friend = null;

            string procedureName = "[dbo].[Friends_SelectById]";

            _data.ExecuteCmd(procedureName, delegate (SqlParameterCollection parameterCollection)
            {

                parameterCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {
                friend = MapSingleFriend(reader);

            });


            return friend;
        }



        public Friend GetByIdJSON(int id)
        {
            Friend friend = new Friend();

            string procedureName = "[dbo].[Friends_SelectByIdV3]";

            _data.ExecuteCmd(procedureName, delegate (SqlParameterCollection parameterCollection)
            {

                parameterCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                friend.Id = reader.GetSafeInt32(startingIndex++);


            });


            return friend;
        } 



        public List<Friend> GetAll()
        {
            List<Friend> list = null;

            string procedureName = "[dbo].[Friends_SelectAll]";

            _data.ExecuteCmd(procedureName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Friend singleFriend = MapSingleFriend(reader);

                if (list == null)
                {
                    list = new List<Friend>();
                }

                list.Add(singleFriend);
            });



            return list;
        }

        public int Add(FriendAddRequest modelFriend, int userId)
        {
            int id = 0;

            string procedureName = "[dbo].[Friends_Insert]";

            _data.ExecuteNonQuery(
            procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(modelFriend, collection);

                collection.AddWithValue("@UserId", userId);

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

        public void Update(FriendUpdateRequest modelFriend, int userId)
        {
            string procedureName = "[dbo].[Friends_Update]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {

                AddCommonParams(modelFriend, collection);

                collection.AddWithValue("@UserId", userId);

                collection.AddWithValue("@Id", modelFriend.Id);


            },
            returnParameters: null);

        }


        public void Delete(int id)
        {
            string procedureName = "[dbo].[Friends_Delete]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);

            },
            returnParameters: null);

        }

        public Paged<Friend> GetPage(int PageIndex,int PageSize)
        {
            Paged<Friend> paginatedList = null;
            List<Friend> list = null;

            int totalCount = 0;

            string procedureName = "[dbo].[Friends_Pagination]";

            _data.ExecuteCmd(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@PageIndex", PageIndex);
                collection.AddWithValue("@PageSize", PageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Friend singleFriend = new Friend();

                singleFriend = MapSingleFriend(reader);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(11); //Its hardcoded to the index number
                }

                if (list == null)
                {
                    list = new List<Friend>();
                }

                list.Add(singleFriend);
            });


            if (list != null)
            {
                paginatedList = new Paged<Friend>(list, PageIndex, PageSize, totalCount);
            }


            return paginatedList;
        }


        private static Friend MapSingleFriend(IDataReader reader)
        {
            Friend singleFriend = new Friend();
            int startingIndex = 0;

            singleFriend.Id = reader.GetSafeInt32(startingIndex++);
            singleFriend.Title = reader.GetSafeString(startingIndex++);
            singleFriend.Bio = reader.GetSafeString(startingIndex++);
            singleFriend.Summary = reader.GetSafeString(startingIndex++);
            singleFriend.Headline = reader.GetSafeString(startingIndex++);
            singleFriend.Slug = reader.GetSafeString(startingIndex++);
            singleFriend.StatusId = reader.GetSafeInt32(startingIndex++);
            singleFriend.PrimaryImageUrl = reader.GetSafeString(startingIndex++);
            singleFriend.UserId = reader.GetSafeInt32(startingIndex++);
            singleFriend.DateCreated = reader.GetSafeDateTime(startingIndex++);
            singleFriend.DateModified = reader.GetSafeDateTime(startingIndex++);

            return singleFriend;

        }


        private static void AddCommonParams(FriendAddRequest modelFriend, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Title", modelFriend.Title);
            collection.AddWithValue("@Bio", modelFriend.Bio);
            collection.AddWithValue("@Summary", modelFriend.Summary);
            collection.AddWithValue("@Headline", modelFriend.Headline);
            collection.AddWithValue("@Slug", modelFriend.Slug);
            collection.AddWithValue("@StatusId", modelFriend.StatusId);
            collection.AddWithValue("@PrimaryImageUrl", modelFriend.PrimaryImageUrl);


        }


    }
}
