USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [sab].[Course_InsertBatch_V2]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [sab].[Course_InsertBatch_V2]
						@batchCourses sab.CourseV2 READONLY

AS

/*
		Select	*
		From	sab.Course

		Declare @newCourses sab.CourseV2
		
		
		--We can insert various courses adding this syntax
		
		Insert into @newCourses(Credits, Title, DepId, Id)
		Values (2, 'My Great Subject77', 7, 9810)

		Insert into @newCourses(Credits, Title, DepId, Id)
		Values (5, 'Calculus 1045 Edited', 2, 1045)

		Insert into @newCourses(Credits, Title, DepId, Id)
		Values (5, 'Inserted Course', 2, 9106)



		Execute sab.Course_InsertBatch_V2
										@newCourses

		Select	*
		From	sab.Course
*/


Begin	
		
		Declare @DateModified datetime2 = getutcdate()

		Execute sab.Course_InsertBatch_V2_Insert @batchCourses, @DateModified;

		Execute sab.Course_InsertBatch_V2_Update @batchCourses;
	
End
GO
