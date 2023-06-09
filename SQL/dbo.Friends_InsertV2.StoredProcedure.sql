USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_InsertV2]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_InsertV2]
								
								 @Title nvarchar(120)
								,@Bio nvarchar(700)
								,@Summary nvarchar(255)
								,@Headline nvarchar(80)
								,@Slug nvarchar(100)
								,@StatusId int
								,@ImageTypeId int
								,@ImageUrl nvarchar(500)
								,@UserId int
								,@Id int OUTPUT
	

AS

/*

	Select *
	from	dbo.FriendsV2 as f2 inner join dbo.Images as i
			on f2.PrimaryImageId = i.Id
	where f2.Id = @Id

	Declare	 @Id			int				=	0 
			,@Title			nvarchar(120)	=	'Title Test6'
			,@Bio			nvarchar(700)	=	'Bio Test6'	 
			,@Summary		nvarchar(255)	=	'Summary Test6'
			,@Headline		nvarchar(80)	=	'Headline Test6'
			,@Slug			nvarchar(100)	=	'Slug Test6'
			,@StatusId		int				=	3
			,@ImageTypeId	int				=	2
			,@ImageUrl		nvarchar(500)	=	'TestURL'
			,@UserId		int				=	6

	Execute	dbo.Friends_InsertV2
	
							     @Title 
								,@Bio 
								,@Summary 
								,@Headline 
								,@Slug 
								,@StatusId 
								,@ImageTypeId 
								,@ImageUrl 
								,@UserId 
								,@Id OUTPUT

	Select *
	from	dbo.FriendsV2 as f2 inner join dbo.Images as i
			on f2.PrimaryImageId = i.Id
	where f2.Id = @Id

*/





BEGIN

		Declare @ImageId	int		= 0

		INSERT INTO [dbo].[Images]
				   ([TypeId]
				   ,[Url])
			 VALUES
				   (@ImageTypeId
				   ,@ImageUrl)

			set @ImageId = SCOPE_IDENTITY(); --I get the image Id that was inserted.


		INSERT INTO [dbo].[FriendsV2]
				   ([Title]
				   ,[Bio]
				   ,[Summary]
				   ,[Headline]
				   ,[Slug]
				   ,[StatusId]
				   ,[PrimaryImageId]
				   ,[UserId])
			 VALUES
					(@Title 
					,@Bio 
					,@Summary 
					,@Headline 
					,@Slug 
					,@StatusId 
					,@ImageId			--Inserting that image Id to the new friend, creating the relation between the two tables.
					,@UserId)

			set @Id = SCOPE_IDENTITY();


END
GO
