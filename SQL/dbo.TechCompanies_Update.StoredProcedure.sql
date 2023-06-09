USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[TechCompanies_Update]
									 @Name					nvarchar(100)
									,@Profile				nvarchar(1000)
									,@Summary				nvarchar(255)
									,@Headline				nvarchar(100)
									,@ContactInformation	nvarchar(1000)
									,@Slug					nvarchar(100)
									,@StatusId				int
									,@ImageTypeId			int
									,@ImageUrl				nvarchar(500)
									,@UserId				int
									,@BatchTags				dbo.BatchTags READONLY
									,@Id					int OUTPUT

AS

/*

	DECLARE	 @Id					int				=	2
			,@Name					nvarchar(100)	=	'My Second Company'
			,@Profile				nvarchar(1000)	=	'Profile of my Second Company'
			,@Summary				nvarchar(255)	=	'Summary of my Second Company'
			,@Headline				nvarchar(100)	=	'Headline of my Second Company'
			,@ContactInformation	nvarchar(1000)	=	'Contact Information of my Second Company'
			,@Slug					nvarchar(100)	=	'Slug of my Second Company'
			,@StatusId				int				=	1
			,@ImageTypeId			int				=	2
			,@ImageUrl				nvarchar(500)	=	'https://randompicturegenerator.com/img/national-park-generator/g9a6542f4d0ccf6052e5c2094302e1e425e51bc6a1d5c26041af3a824bedb0b9f8a5f7784eebc7861d082772456bcf0fa_640.jpg'
			,@UserId				int				=	2


	DECLARE	@Tags					dbo.BatchTags
			
			INSERT INTO @Tags(Tag)
					Values ('Remote')
			INSERT INTO @Tags(Tag)
					Values ('Open-Minded')
			INSERT INTO @Tags(Tag)
					Values ('Technology')

	EXECUTE dbo.TechCompanies_Update
										
										@Name
									   ,@Profile
									   ,@Summary
									   ,@Headline
									   ,@ContactInformation
									   ,@Slug
									   ,@StatusId
									   ,@ImageTypeId 
									   ,@ImageUrl 
									   ,@UserId
									   ,@Tags
									   ,@Id OUTPUT

	SELECT *
	FROM dbo.TechCompanies	as tc inner join dbo.TechCompaniesImages as ti
	ON	tc.PrimaryImageId = ti.id
	WHERE tc.Id = @Id

*/



BEGIN

		DECLARE	 @DateModified	datetime2	= GETUTCDATE()
				,@ImageId		int			= (SELECT PrimaryImageId
											   FROM dbo.TechCompanies
											   WHERE Id = @Id)

		DECLARE	@TagsId			int			= (SELECT Id
											   FROM dbo.TechCompanies
											   WHERE Id = @Id)



		DELETE FROM [dbo].[TechCompaniesBrigdeTags]
			  WHERE TechCompanyId = @Id


		INSERT INTO [dbo].[TechCompaniesTags]
				   ([Tag])
		SELECT	bt.Tag
		FROM	@BatchTags AS bt
		WHERE	NOT EXISTS (SELECT 1
							FROM dbo.TechCompaniesTags AS tc
							WHERE tc.Tag = bt.Tag)

		INSERT INTO [dbo].[TechCompaniesBrigdeTags]
					([TechCompanyId]
					,[TagId])
		SELECT	 @Id
				,tc.Id
		FROM dbo.TechCompaniesTags AS tc
		WHERE EXISTS (	SELECT 1
						FROM @BatchTags AS bt
						WHERE bt.Tag = tc.Tag)



		UPDATE [dbo].[TechCompaniesImages]
		   SET [TypeId] = @ImageTypeId
			  ,[Url]	= @ImageUrl
		 WHERE Id = @ImageId


		UPDATE [dbo].[TechCompanies]
		   SET [Name]				= @Name
			  ,[Profile]			= @Profile
			  ,[Summary]			= @Summary
			  ,[Headline]			= @Headline	
			  ,[ContactInformation] = @ContactInformation
			  ,[Slug]				= @Slug
			  ,[StatusId]			= @StatusId
			  ,[DateModified]		= @DateModified
			  ,[UserId]				= @UserId
		 WHERE Id = @Id


END
GO
