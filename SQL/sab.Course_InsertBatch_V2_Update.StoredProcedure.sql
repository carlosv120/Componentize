USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [sab].[Course_InsertBatch_V2_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [sab].[Course_InsertBatch_V2_Update]
											@batchCourses sab.CourseV2 READONLY
AS
/*

	Select	*
		From	sab.Course

		Declare @newCourses sab.CourseV2
		
		
		--We can update various courses adding this syntax
		--The Id's must be existent for values to be updated
		
		Insert into @newCourses(Credits, Title, DepId, Id)
		Values (1, 'My Great Subject7', 7, 9104)


		Insert into @newCourses(Credits, Title, DepId, Id)
		Values (5, 'Inserted Course', 2, 9106)

		Execute sab.Course_InsertBatch_V2
										@newCourses

		Select	*
		From	sab.Course

*/


BEGIN

		Declare @DateModified datetime2 = getutcdate()

		Update sab.Course
				Set Credits = b.Credits
					,Title = b.Title
					,DepartmentId = b.DepId
					,DateModified = @DateModified

				From @batchCourses as b inner join sab.Course as c
					on c.CourseId = b.Id


END
GO
