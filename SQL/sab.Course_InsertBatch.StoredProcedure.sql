USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [sab].[Course_InsertBatch]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [sab].[Course_InsertBatch]
						@batchCourses sab.Course READONLY

AS

/*
		Select	*
		From	sab.Course

		Declare @newCourses sab.Course

		Insert into @newCourses(Credits, Title, DepId)
		Values (1, 'My Great Subject7', 7)
		Insert into @newCourses(Credits, Title, DepId)
		Values (5, 'My Great Subject8', 4)


		Execute sab.Course_InsertBatch
										@newCourses

		Select	*
		From	sab.Course
*/


Begin
		
		Insert into sab.Course (Credits
						,Title
						,DepartmentId)

		Select   n.Credits
				,n.Title
				,n.DepId
		From @batchCourses as n

End
GO
