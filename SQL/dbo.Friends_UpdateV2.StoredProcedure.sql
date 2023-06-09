USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_UpdateV2]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_UpdateV2]
								 @Title nvarchar(120)
								,@Bio nvarchar(700)
								,@Summary nvarchar(255)
								,@Headline nvarchar(80)
								,@Slug nvarchar(100)
								,@StatusId int
								,@ImageTypeId int
								,@ImageUrl nvarchar(500)
								,@UserId int
								,@Id int

AS

/*
	Declare  @Title				nvarchar(120)	= 'Title Edited'
			,@Bio				nvarchar(700)	= 'Bio Edited'
			,@Summary			nvarchar(255)	= 'Summary Edited'
			,@Headline			nvarchar(80)	= 'Headline Edited'
			,@Slug				nvarchar(100)	= 'Slug Edited'
			,@StatusId			int				= 1
			,@ImageTypeId		int				= 1
			,@ImageUrl			nvarchar(500)	= 'TestURL Edited'
			,@UserId			int				= 2
			,@Id				int				= 3



	Execute dbo.Friends_UpdateV2
								 @Title
								,@Bio 
								,@Summary 
								,@Headline 
								,@Slug
								,@StatusId
								,@ImageTypeId 
								,@ImageUrl 
								,@UserId 
								,@Id 

	Select *
	from	dbo.FriendsV2 as f2 inner join dbo.Images as i
			on f2.PrimaryImageId = i.Id
	where f2.Id = @Id
*/



BEGIN

		Declare  @DateModified datetime2 = GETUTCDATE()
				,@ImageId	   int		 = (select PrimaryImageId
											from dbo.FriendsV2
											where Id = @Id) --where the id from the friends table is equal to the Id I defined

		UPDATE [dbo].[Images]
		   SET [TypeId]		= @ImageTypeId
			  ,[Url]		= @ImageUrl

		   Where Id = @ImageId		--where the Id from the images table equals the Image Id I defined.


		UPDATE [dbo].[FriendsV2]
		   SET [Title]			= @Title
			  ,[Bio]			= @Bio
			  ,[Summary]		= @Summary
			  ,[Headline]		= @Headline
			  ,[Slug]			= @Slug
			  ,[StatusId]		= @StatusId
			  ,[DateModified]	= @DateModified
			  ,[UserId]			= @UserId	
			  
		 WHERE Id = @Id


END
GO
