USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_Update]
			
			 @Title				nvarchar(120)
			,@Bio				nvarchar(700)
			,@Summary			nvarchar(255)
			,@Headline			nvarchar(80)
			,@Slug				nvarchar(100)
			,@StatusId			int
			,@PrimaryImageUrl	nvarchar(500)
			,@UserId			int
			,@Id				int



AS

/*
	Declare  @Title				nvarchar(120)	= 'Title Edited'
			,@Bio				nvarchar(700)	= 'Bio Edited'
			,@Summary			nvarchar(255)	= 'Summary Edited'
			,@Headline			nvarchar(80)	= 'Headline Edited'
			,@Slug				nvarchar(100)	= 'Slug Edited'
			,@StatusId			int				= '2'
			,@PrimaryImageUrl	nvarchar(500)	= 'Image Edited'
			,@UserId			int				= '2'
			,@Id				int				= 5


	Select *
	from	dbo.Friends
	Where Id =@Id

	Execute dbo.Friends_Update
								 @Title				
								,@Bio				
								,@Summary			
								,@Headline			
								,@Slug				
								,@StatusId			
								,@PrimaryImageUrl	
								,@UserId			
								,@Id	


	Select *
	from	dbo.Friends
	Where Id =@Id
*/


BEGIN

		Declare @DateModified datetime2 = GETUTCDATE()

		UPDATE [dbo].[Friends]
		   SET [Title] =			@Title
			  ,[Bio] =				@Bio
			  ,[Summary] =			@Summary
			  ,[Headline] =			@Headline	
			  ,[Slug] =				@Slug	
			  ,[StatusId] =			@StatusId
			  ,[PrimaryImageUrl] =	@PrimaryImageUrl
			  ,[DateModified] =		@DateModified	
			  ,[UserId] =			@UserId

		 WHERE Id = @Id

END
GO
