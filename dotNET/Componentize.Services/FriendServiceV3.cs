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
    public class FriendServiceV3 : IFriendServiceV3
    {
        IDataProvider _data = null;

        public FriendServiceV3(IDataProvider data)
        {
            _data = data;
        }

        public FriendV3 Get(int id)
        {
            FriendV3 friend = null;

            string procedureName = "[dbo].[Friends_SelectByIdV3]";

            _data.ExecuteCmd(procedureName, delegate (SqlParameterCollection parameterCollection)
            {

                parameterCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {
                friend = MapSingleFriendV3(reader);

            });

            return friend;
        }


        public List<FriendV3> GetAll()
        {
            List<FriendV3> list = null;

            string procedureName = "dbo.Friends_SelectAllV3";

            _data.ExecuteCmd(procedureName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                FriendV3 singleFriend = MapSingleFriendV3(reader);

                if (list == null)
                {
                    list = new List<FriendV3>();
                }

                list.Add(singleFriend);
            });


            return list;
        }


        public void Delete(int id)
        {
            string procedureName = "[dbo].[Friends_DeleteV3]";

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);

            },
            returnParameters: null);

        }

        public Paged<FriendV3> GetPage(int PageIndex, int PageSize)
        {
            Paged<FriendV3> paginatedlist = null;
            List<FriendV3> list = null;

            int totalCount = 0;
            string procedureName = "[dbo].[Friends_PaginationV3]";

            _data.ExecuteCmd(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@PageIndex", PageIndex);
                collection.AddWithValue("@PageSize", PageSize);

            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                FriendV3 singleFriend = new FriendV3();

                singleFriend = MapSingleFriendV3(reader);

                if (totalCount == 0)
                {
                    //ALWAYS CHANGE THE COUNT VALUE ADDING AN ENPOINT
                    //TO CHECK THE LAST INDEX
                    totalCount = reader.GetSafeInt32(14);
                }

                if (list == null)
                {
                    list = new List<FriendV3>();
                }

                list.Add(singleFriend);
            });

            if (list != null)
            {
                paginatedlist = new Paged<FriendV3>(list, PageIndex, PageSize, totalCount);
            }

            return paginatedlist;
        }


        public Paged<FriendV3> SearchPage(int PageIndex, int PageSize, string Query)
        {
            Paged<FriendV3> paginatedlist = null;
            List<FriendV3> list = null;

            int totalCount = 0;
            string procedureName = "[dbo].[Friends_Search_PaginationV3]";

            _data.ExecuteCmd(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@PageIndex", PageIndex);
                collection.AddWithValue("@PageSize", PageSize);
                collection.AddWithValue("@Query", Query);

            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                FriendV3 singleFriend = new FriendV3();

                singleFriend = MapSingleFriendV3(reader);

                if (totalCount == 0)
                {
                    //ALWAYS CHANGE THE COUNT VALUE ADDING AN ENPOINT
                    //TO CHECK THE LAST INDEX
                    totalCount = reader.GetSafeInt32(14);
                }

                if (list == null)
                {
                    list = new List<FriendV3>();
                }

                list.Add(singleFriend);
            });

            if (list != null)
            {
                paginatedlist = new Paged<FriendV3>(list, PageIndex, PageSize, totalCount);
            }

            return paginatedlist;
        }


        public int Add(FriendAddRequestV3 modelFriend, int userId)
        {
            int id = 0;

            string procedureName = "[dbo].[Friends_InsertV3]";

            DataTable myParamValues = MapSkillsToTable(modelFriend.Skills);

            _data.ExecuteNonQuery(
            procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(modelFriend, collection);

                collection.AddWithValue("@UserId", userId);
                collection.AddWithValue("@BatchSkills", myParamValues);


                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                collection.Add(idOut);

            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object objectId = returnCollection["@Id"].Value;

                int.TryParse(objectId.ToString(), out id);

            });

            return id;
        }


        public int AddObject(FriendAddRequestV3 modelFriend, int userId)
        {
            int id = 0;

            string procedureName = "[dbo].[Friends_InsertV3]";


            DataTable myParamValues = MapSkillsToTableObject(modelFriend.SkillsObject);

            _data.ExecuteNonQuery(
            procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(modelFriend, collection);

                collection.AddWithValue("@UserId", userId);
                collection.AddWithValue("@BatchSkills", myParamValues);


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


        public void Update(FriendUpdateRequestV3 modelFriend, int userId)
        {
            string procedureName = "[dbo].[Friends_UpdateV3]";

            DataTable myParamValues = MapSkillsToTable(modelFriend.Skills);

            _data.ExecuteNonQuery(procedureName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {

                AddCommonParams(modelFriend, collection);

                collection.AddWithValue("@UserId", userId);
                collection.AddWithValue("@BatchSkills", myParamValues);
                collection.AddWithValue("@Id", modelFriend.Id);

            },
            returnParameters: null);

        }


        //////////////
        private DataTable MapSkillsToTable(List<string> skillsToMap)
        {

            DataTable dt = new DataTable();

            dt.Columns.Add("Name", typeof(string));


            foreach (string singleSkill in skillsToMap)
            {

                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleSkill);

                dt.Rows.Add(dr);

            }


            return dt;
        }
        private DataTable MapSkillsToTableObject(List<SkillAddRequest> skillsToMap)
        {

            DataTable dt = new DataTable();

            dt.Columns.Add("Name", typeof(string));


            foreach (SkillAddRequest singleSkill in skillsToMap)
            {

                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleSkill.Name);

                dt.Rows.Add(dr);

            }


            return dt;
        }
        //////////////

        private static void AddCommonParams(FriendAddRequestV3 modelFriend, SqlParameterCollection collection)
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

        private static FriendV3 MapSingleFriendV3(IDataReader reader)
        {
            FriendV3 singleFriend = new FriendV3();
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

            singleFriend.Skills = reader.DeserializeObject<List<Skills>>(startingIndex++);

            singleFriend.UserId = reader.GetSafeInt32(startingIndex++);
            singleFriend.DateCreated = reader.GetSafeDateTime(startingIndex++);
            singleFriend.DateModified = reader.GetSafeDateTime(startingIndex++);


            return singleFriend;

        }


    }
}
