USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Courses_SelectById]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROC [dbo].[Courses_SelectById]
									@Id int
AS

/*
	DECLARE	@Id	int	= 3

	EXECUTE dbo.Courses_SelectById
									@Id

*/

BEGIN

		SELECT	 c.Id AS id
				,c.Name AS name
				,c.Description AS description
				,st.Term AS seasonTerm
				,t.Name AS teacher
				,students = (	SELECT	 s.Id as id
										,s.Name as name

								FROM	dbo.Students AS s inner join dbo.StudentCourses as sc
								ON		sc.StudentId = s.Id
								WHERE	sc.CourseId = c.Id

								FOR JSON AUTO
							)

		FROM	dbo.Courses as c inner join dbo.SeasonTerms AS st
		ON		c.SeasonTermId = st.Id
				
				inner join dbo.Teachers AS t
		ON		c.TeacherId = t.Id

		WHERE c.Id = @Id

END
GO
