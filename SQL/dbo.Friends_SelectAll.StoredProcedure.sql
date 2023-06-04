USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectAll]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_SelectAll]

AS

/*

		Execute dbo.Friends_SelectAll

*/

BEGIN


		SELECT [Id]
			  ,[Title]
			  ,[Bio]
			  ,[Summary]
			  ,[Headline]
			  ,[Slug]
			  ,[StatusId]
			  ,[PrimaryImageUrl]
			  ,[UserId]
			  ,[DateCreated]
			  ,[DateModified]
		  FROM [dbo].[Friends]




END
GO
