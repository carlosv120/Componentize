USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Courses_Insert]
								 @Name				nvarchar(200)
								,@Description		nvarchar(200)
								,@SeasonTermId		int
								,@TeacherId			int
								,@Id				int OUTPUT

AS		

/*
	DECLARE		 @Id			int				= 0
				,@Name			nvarchar(200)	= 'Course4'
				,@Description	nvarchar(200)	= 'DescriptionCourse4'
				,@SeasonTermId	int				= 4
				,@TeacherId		int				= 3

	Execute dbo.Courses_Insert
								 @Name
								,@Description
								,@SeasonTermId
								,@TeacherId
								,@Id OUTPUT
	
	Select	*
	FROM	dbo.Courses as c


*/



BEGIN


INSERT INTO [dbo].[Courses]
           ([Name]
           ,[Description]
           ,[SeasonTermId]
           ,[TeacherId])
     VALUES
           (@Name
           ,@Description
           ,@SeasonTermId
           ,@TeacherId)

	set @Id = SCOPE_IDENTITY();


END
GO
