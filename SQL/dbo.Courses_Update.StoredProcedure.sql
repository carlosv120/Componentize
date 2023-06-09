USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Courses_Update]
								 @Name				nvarchar(200)
								,@Description		nvarchar(200)
								,@SeasonTermId		int
								,@TeacherId			int
								,@Id				int OUTPUT

AS

/*
	DECLARE		 @Id			int				= 7
				,@Name			nvarchar(200)	= 'EDITED Course4'
				,@Description	nvarchar(200)	= 'DescriptionCourse4'
				,@SeasonTermId	int				= 4
				,@TeacherId		int				= 3

	Select	*
	FROM	dbo.Courses as c
	WHERE	c.Id = @Id

	Execute dbo.Courses_Insert
								 @Name
								,@Description
								,@SeasonTermId
								,@TeacherId
								,@Id OUTPUT
	
	Select	*
	FROM	dbo.Courses as c
	WHERE	c.Id = @Id

*/


BEGIN


		UPDATE [dbo].[Courses]
		   SET [Name]			= @Name
			  ,[Description]	= @Description
			  ,[SeasonTermId]	= @SeasonTermId
			  ,[TeacherId]		= @TeacherId
		 WHERE Id = @Id


	

END
GO
