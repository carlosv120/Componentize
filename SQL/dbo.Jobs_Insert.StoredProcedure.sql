USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Jobs_Insert]
							 @Title				nvarchar(120)
							,@Description		nvarchar(1000)
							,@Summary			nvarchar(255)
							,@Pay				int
							,@Slug				nvarchar(100)
							,@StatusId			int
							,@TechCompanyId		int
							,@UserId			int
							,@BatchJobSkills	dbo.BatchJobSkills READONLY
							,@Id				int OUTPUT

AS
/*
	DECLARE	 @Id					int				=	0
			,@Title					nvarchar(120)	=	'My Fifth Job'
			,@Description			nvarchar(1000)	=	'My Fifth Job Description'
			,@Summary				nvarchar(255)	=	'My Fifth Job Summary'
			,@Pay					int				=	81000
			,@Slug					nvarchar(100)	=	'My Fifth Job Slug'
			,@StatusId				int				=	3
			,@TechCompanyId			int				=	3
			,@UserId				int				=	3


	DECLARE	@Skills					dbo.BatchJobSkills
			
			INSERT INTO @Skills(Skill)
					Values ('Dynamic')
			INSERT INTO @Skills(Skill)
					Values ('Talented')

	EXECUTE dbo.Jobs_Insert
										
							 @Title				
							,@Description		
							,@Summary			
							,@Pay				
							,@Slug				
							,@StatusId			
							,@TechCompanyId		
							,@UserId			
							,@Skills	
							,@Id	OUTPUT


	SELECT	*	FROM	dbo.Jobs as j inner join dbo.TechCompanies as tc
	On		j.TechCompanyId = tc.Id
	

*/


BEGIN


		INSERT INTO [dbo].[Jobs]
				   ([Title]
				   ,[Description]
				   ,[Summary]
				   ,[Pay]
				   ,[Slug]
				   ,[StatusId]
				   ,[TechCompanyId]
				   ,[UserId])
			 VALUES
				   (@Title
				   ,@Description
				   ,@Summary
				   ,@Pay
				   ,@Slug
				   ,@StatusId
				   ,@TechCompanyId
				   ,@UserId)


		SET @Id = SCOPE_IDENTITY();

		DECLARE @SkillId int	=	0

		INSERT INTO [dbo].[JobsSkills]
				   ([Skill])
		SELECT	bjs.Skill
		FROM	@BatchJobSkills	AS	bjs
		WHERE	NOT EXISTS (Select 1
							FROM   dbo.JobsSkills as js
							WHERE  js.Skill = bjs.Skill)



		INSERT INTO [dbo].[JobsBridgeSkills]
				   ([JobId]
				   ,[SkillId])
		
		SELECT  @Id
				,js.Id
		FROM dbo.JobsSkills AS js
		WHERE EXISTS (	SELECT 1
						FROM @BatchJobSkills as bjs
						WHERE bjs.Skill = js.Skill)

END
GO
