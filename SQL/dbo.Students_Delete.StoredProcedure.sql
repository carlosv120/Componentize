USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Students_Delete]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROC [dbo].[Students_Delete]
								@Id int
AS

/*
		DECLARE @Id	int	= 4

			SELECT	*
			FROM	dbo.Students

		EXECUTE dbo.Students_Delete
									@Id
		
			SELECT	*
			FROM	dbo.Students
*/


BEGIN


		DELETE FROM [dbo].[StudentCourses]
			  WHERE StudentId = @Id

		DELETE FROM [dbo].[Students]
			  WHERE Id = @Id

END
GO
