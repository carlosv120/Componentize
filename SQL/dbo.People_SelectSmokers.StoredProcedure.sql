USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_SelectSmokers]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[People_SelectSmokers]
	

		@SmokerFlag bit
as


/* TEST CODE


		declare @SmokerFlag bit = null
		Execute dbo.[People_SelectSmokers]
										@SmokerFlag


									--impossible to find nulls without OR's
				

*/


begin 

	
SELECT [Id]
      ,[Name]
      ,[Age]				--Always do the same columns in all the selects
      ,[IsSmoker]
      ,[DateAdded]
      ,[DateModified]
      ,[UserId]
  FROM [dbo].[People]

  where [IsSmoker] = @SmokerFlag
		OR
		(@SmokerFlag IS NULL AND [IsSmoker] IS NULL)


end
GO
