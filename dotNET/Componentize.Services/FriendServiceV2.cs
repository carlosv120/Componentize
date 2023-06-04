using Sabio.Data.Providers;
using Sabio.Models.Domain.Friends;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Services.Interfaces;
using Sabio.Models;
using Sabio.Models.Requests.Friends;

namespace Sabio.Services
{
    public class FriendServiceV2 : IFriendServiceV2
    {
        IDataProvider _data = null;

        public FriendServiceV2(IDataProvider data)
        {
            _data = data;
        }

        public FriendV2 Get(int id)
        {
            FriendV2 friend = null;

            string procedureName = "[dbo].[Friends_SelectByIdV2]";

            _data.ExecuteCmd(procedureName, delegate (SqlParameterCollection parameterCollection)
            {

                parameterCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {
                friend = MapSingleFriendV2(reader);

            });

            return friend;
        }

        public List<FriendV2> GetAll()
        {
            List<FriendV2> list = null;

            string procedureName = "dbo.Friends_SelectAllV2";

            _data.ExecuteCmd(procedureName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                FriendV2 singleFriend = MapSingleFriendV2(reader);

                if (list == null)
                {
                    list = new List<FriendV2>();
                }

                list.Add(singleFriend);
            });


            return list;
        }

        public void Delete(int id)
        {
            string procedureName = "[dbo].[Friends_DeleteV2]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);

            },
            returnParameters: null);

        }


        public Paged<FriendV2> GetPage(int PageIndex, int PageSize)
        {
            Paged<FriendV2> paginatedlist = null;
            List<FriendV2> list = null;

            int totalCount = 0;
            string procedureName = "[dbo].[Friends_PaginationV2]";

            _data.ExecuteCmd(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@PageIndex", PageIndex);
                collection.AddWithValue("@PageSize", PageSize);

            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                FriendV2 singleFriend = new FriendV2();

                singleFriend = MapSingleFriendV2(reader);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(13);
                }

                if (list == null)
                {
                    list = new List<FriendV2>();
                }

                list.Add(singleFriend);
            });

            if (list != null)
            {
                paginatedlist = new Paged<FriendV2>(list, PageIndex, PageSize, totalCount);
            }

            return paginatedlist;
        }

        public Paged<FriendV2> SearchPage (int PageIndex, int PageSize, string Query) 
        {
            Paged<FriendV2> paginatedlist = null;
            List<FriendV2> list = null;

            int totalCount = 0;
            string procedureName = "[dbo].[Friends_Search_PaginationV2]";

            _data.ExecuteCmd(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@PageIndex", PageIndex);
                collection.AddWithValue("@PageSize", PageSize);
                collection.AddWithValue("@Query", Query);

            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                FriendV2 singleFriend = new FriendV2();

                singleFriend = MapSingleFriendV2(reader);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(13);
                }

                if (list == null)
                {
                    list = new List<FriendV2>();
                }

                list.Add(singleFriend);
            });

            if (list != null)
            {
                paginatedlist = new Paged<FriendV2>(list, PageIndex, PageSize, totalCount);
            }

            return paginatedlist;
        }


        public int Add(FriendAddRequestV2 modelFriend, int userId)
        {
            int id = 0;

            string procedureName = "[dbo].[Friends_InsertV2]";

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


        public void Update(FriendUpdateRequestV2 modelFriend, int userId)
        {
            string procedureName = "[dbo].[Friends_UpdateV2]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {

                AddCommonParams(modelFriend, collection);

                collection.AddWithValue("@UserId", userId);
                collection.AddWithValue("@Id", modelFriend.Id);


            },
            returnParameters: null);

        }


        private static void AddCommonParams(FriendAddRequestV2 modelFriend, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Title", modelFriend.Title);
            collection.AddWithValue("@Bio", modelFriend.Bio);
            collection.AddWithValue("@Summary", modelFriend.Summary);
            collection.AddWithValue("@Headline", modelFriend.Headline);
            collection.AddWithValue("@Slug", modelFriend.Slug);
            collection.AddWithValue("@StatusId", modelFriend.StatusId);
            collection.AddWithValue("@ImageTypeId", modelFriend.ImageTypeId);
            collection.AddWithValue("@ImageUrl", modelFriend.ImageUrl);



        }


        private static FriendV2 MapSingleFriendV2(IDataReader reader)
        {
            FriendV2 singleFriend = new FriendV2();
            singleFriend.PrimaryImage = new Image();

            int startingIndex = 0;

            singleFriend.Id = reader.GetSafeInt32(startingIndex++);
            singleFriend.Title = reader.GetSafeString(startingIndex++);
            singleFriend.Bio = reader.GetSafeString(startingIndex++);
            singleFriend.Summary = reader.GetSafeString(startingIndex++);
            singleFriend.Headline = reader.GetSafeString(startingIndex++);
            singleFriend.Slug = reader.GetSafeString(startingIndex++);
            singleFriend.StatusId = reader.GetSafeInt32(startingIndex++);
            singleFriend.PrimaryImage.Id = reader.GetSafeInt32(startingIndex++);
            singleFriend.PrimaryImage.TypeId = reader.GetSafeInt32(startingIndex++);
            singleFriend.PrimaryImage.Url = reader.GetSafeString(startingIndex++);
            singleFriend.UserId = reader.GetSafeInt32(startingIndex++);
            singleFriend.DateCreated = reader.GetSafeDateTime(startingIndex++);
            singleFriend.DateModified = reader.GetSafeDateTime(startingIndex++);


            return singleFriend;

        }

    }
}
