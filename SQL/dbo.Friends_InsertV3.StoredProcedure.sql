USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_InsertV3]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_InsertV3]

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



	Declare	 @Id			int				=	0 
			,@Title			nvarchar(120)	=	'Title Test91'
			,@Bio			nvarchar(700)	=	'Bio Test91'	 
			,@Summary		nvarchar(255)	=	'Summary Test91'
			,@Headline		nvarchar(80)	=	'Headline Test91'
			,@Slug			nvarchar(100)	=	'Slug Test91'
			,@StatusId		int				=	1
			,@ImageTypeId	int				=	1
			,@ImageUrl		nvarchar(500)	=	'TestURL91'
			,@UserId		int				=	91


	Declare @Skill		dbo.BatchSkills
			
			insert into @newSkill(Name)
					Values ('Collaborative')
			insert into @newSkill(Name)
					Values ('Good Talker')
			

	Execute	dbo.Friends_InsertV3
	
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

		Declare @ImageId	int		= 0

		INSERT INTO [dbo].[Images]
				   ([TypeId]
				   ,[Url])
			 VALUES
				   (@ImageTypeId
				   ,@ImageUrl)

			set @ImageId = SCOPE_IDENTITY(); 


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
					,@ImageId			
					,@UserId)

			set @Id = SCOPE_IDENTITY();


		Declare @SkillId	int		= 0

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
						,Id
							from dbo.Skills as sk
							where exists (  select 1
											from @BatchSkills as nsk
											where nsk.Name = sk.Name) 

END
GO
