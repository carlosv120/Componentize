USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Pagination]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROC [dbo].[Courses_Pagination]
									 @PageIndex	int
									,@PageSize	int
AS

/*
	DECLARE	@PageIndex	int	=	0
			,@PageSize	int	=	2

	EXECUTE dbo.Courses_Pagination
								 @PageIndex
								,@PageSize
	SELECT	*
	FROM	dbo.Courses as c inner join dbo.SeasonTerms AS st
	ON		c.SeasonTermId = st.Id
				
			inner join dbo.Teachers AS t
	ON		c.TeacherId = t.Id

*/

BEGIN

		DECLARE @Offset	int	=	@PageIndex*@PageSize

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
				,TotalCount = COUNT(1) OVER()

		FROM	dbo.Courses as c inner join dbo.SeasonTerms AS st
		ON		c.SeasonTermId = st.Id
				
				inner join dbo.Teachers AS t
		ON		c.TeacherId = t.Id

		ORDER BY	c.Id
		OFFSET		@Offset ROWS
		FETCH NEXT	@PageSize ROWS ONLY
END
GO
