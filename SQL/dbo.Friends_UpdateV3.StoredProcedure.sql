USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_UpdateV3]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_UpdateV3]
								 @Title nvarchar(120)
								,@Bio nvarchar(700)
								,@Summary nvarchar(255)
								,@Headline nvarchar(80)
								,@Slug nvarchar(100)
								,@StatusId int
								,@ImageTypeId int
								,@ImageUrl nvarchar(500)
								,@UserId int
								,@BatchSkills dbo.BatchSkills READONLY
								,@Id int OUTPUT


AS

/*

	

	Declare	 @Id			int				=	696 
			,@Title			nvarchar(120)	=	'EDITED Title Test91'
			,@Bio			nvarchar(700)	=	'Bio Test91'	 
			,@Summary		nvarchar(255)	=	'Summary Test91'
			,@Headline		nvarchar(80)	=	'Headline Test91'
			,@Slug			nvarchar(100)	=	'Slug Test91'
			,@StatusId		int				=	1
			,@ImageTypeId	int				=	1
			,@ImageUrl		nvarchar(500)	=	'TestURL91'
			,@UserId		int				=	91


	Declare @Skill		dbo.BatchSkills
			
			insert into @Skill(Name)
					Values ('Collaborative')
			insert into @Skill(Name)
					Values ('Not Good Talker')
			

	Execute	dbo.Friends_UpdateV3
	
							     @Title 
								,@Bio 
								,@Summary 
								,@Headline 
								,@Slug 
								,@StatusId 
								,@ImageTypeId 
								,@ImageUrl 
								,@UserId 
								,@Skill
								,@Id OUTPUT

	Select *
	from	dbo.FriendsV2 as f2 inner join dbo.Images as i
			on f2.PrimaryImageId = i.Id
	where f2.Id = @Id



*/


BEGIN
		
		Declare  @DateModified datetime2 = GETUTCDATE()
				,@ImageId	   int		 = (select PrimaryImageId
											from dbo.FriendsV2
											where Id = @Id)
		
		Declare @SkillsId int = (select Id
								 from dbo.FriendsV2
								 where Id = @Id)

		DELETE FROM [dbo].[FriendSkills]
			  WHERE FriendId = @Id

		INSERT INTO dbo.Skills
					([Name])

		SELECT nsk.Name
			FROM @BatchSkills as nsk 
			WHERE Not Exists (	Select 1
								From dbo.Skills as sk
								where sk.Name = nsk.Name)
	
		INSERT INTO [dbo].[FriendSkills]
					([FriendId]
					,[SkillId])
				Select 
						@Id
						,sk.Id
							from dbo.Skills as sk
							where exists (  select 1
											from @BatchSkills as nsk
											where nsk.Name = sk.Name) 

		UPDATE [dbo].[Images]
		   SET [TypeId]		= @ImageTypeId
			  ,[Url]		= @ImageUrl

		   Where Id = @ImageId


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
