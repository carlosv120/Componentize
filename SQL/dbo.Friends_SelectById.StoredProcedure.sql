USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectById]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_SelectById]

		   @Id int

AS

/*
		Select *
		from	dbo.Friends
	
		declare @Id int = 4
		Execute dbo.Friends_SelectById
										@Id
		
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
	  WHERE Id = @Id


END
GO
