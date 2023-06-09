USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROC [dbo].[TechCompanies_Insert]
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
	DECLARE	 @Id					int				=	0
			,@Name					nvarchar(100)	=	'My Second Company'
			,@Profile				nvarchar(1000)	=	'Profile of my Second Company'
			,@Summary				nvarchar(255)	=	'Summary of my Second Company'
			,@Headline				nvarchar(100)	=	'Headline of my Second Company'
			,@ContactInformation	nvarchar(1000)	=	'Contact Information of my Second Company'
			,@Slug					nvarchar(100)	=	'Slug of my Second Company'
			,@StatusId				int				=	1
			,@ImageTypeId			int				=	2
			,@ImageUrl				nvarchar(500)	=	'https://randompicturegenerator.com/img/national-park-generator/gcca465546c1c87efc607c503f5edbbe1c047a9b82037dd26ac13416756333432029ffb1f5d07a450f836f24344ebb8e5_640.jpg'
			,@UserId				int				=	2


	DECLARE	@Tags					dbo.BatchTags
			
			INSERT INTO @Tags(Tag)
					Values ('Multinational')
			INSERT INTO @Tags(Tag)
					Values ('Remote')
			INSERT INTO @Tags(Tag)
					Values ('Open-Minded')
			INSERT INTO @Tags(Tag)
					Values ('Technology')

	EXECUTE dbo.TechCompanies_Insert
										
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
		

*/

BEGIN

		DECLARE @ImageId	int = 0
		INSERT INTO [dbo].[TechCompaniesImages]
				   ([TypeId]
				   ,[Url])
			 VALUES
				   (@ImageTypeId
				   ,@ImageUrl)
		SET @ImageId = SCOPE_IDENTITY()


		INSERT INTO [dbo].[TechCompanies]
				   ([Name]
				   ,[Profile]
				   ,[Summary]
				   ,[Headline]
				   ,[ContactInformation]
				   ,[Slug]
				   ,[StatusId]
				   ,[PrimaryImageId]
				   ,[UserId])
			 VALUES
				   (@Name
				   ,@Profile
				   ,@Summary
				   ,@Headline
				   ,@ContactInformation
				   ,@Slug
				   ,@StatusId
				   ,@ImageId
				   ,@UserId)
			SET @Id = SCOPE_IDENTITY();

		DECLARE @TagId	int		= 0
		INSERT INTO [dbo].[TechCompaniesTags]
				   ([Tag])
		SELECT	bt.Tag
				FROM @BatchTags AS bt
				WHERE NOT EXISTS (SELECT 1
								 FROM dbo.TechCompaniesTags AS tc
								 WHERE tc.Tag = bt.Tag)


		INSERT INTO [dbo].[TechCompaniesBrigdeTags]
				   ([TechCompanyId]
				   ,[TagId])

		SELECT
				 @Id
				,tc.Id
		FROM dbo.TechCompaniesTags AS tc
		WHERE EXISTS (	SELECT 1
						FROM @BatchTags as bt
						WHERE bt.Tag = tc.Tag)

END
GO
