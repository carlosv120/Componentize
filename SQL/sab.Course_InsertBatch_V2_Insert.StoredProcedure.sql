USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [sab].[Course_InsertBatch_V2_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [sab].[Course_InsertBatch_V2_Insert]
									@batchCourses sab.CourseV2 READONLY
								   ,@DateModified datetime2
as

/*
	Select	*
		From	sab.Course

		Declare @newCourses sab.CourseV2
		
		
		--We can insert various courses adding this syntax
		--The Id's must be different for values to be inserted
		


		Insert into @newCourses(Credits, Title, DepId, Id)
		Values (1, 'My Great Subject7', 7, 9104)


		Insert into @newCourses(Credits, Title, DepId, Id)
		Values (5, 'Inserted Course', 2, 9106)

		Execute sab.Course_InsertBatch_V2
										@newCourses

		Select	*
		From	sab.Course


*/


Begin
		
		SET IDENTITY_INSERT Sab.Course ON
		
					Insert into sab.Course (Credits
											,Title
											,DepartmentId
											,CourseId
											,DateModified)

					Select   n.Credits
							,n.Title
							,n.DepId
							,n.Id
							,@DateModified
					From @batchCourses as n
					where Not Exists (	Select 1					--here it only inserts the values that we dont have
										from sab.Course as c		--regardless of what's passed. 
										where c.CourseId = n.Id)


		SET IDENTITY_INSERT Sab.Course OFF

End
GO
