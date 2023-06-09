USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_DeleteIsSmoker]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[People_DeleteIsSmoker]

			@IsSmokerPerson bit
as


/*
	Declare @IsSmokerPerson bit = null
	
		Select *
		From dbo.People
		WHERE IsSmoker = @IsSmokerPerson;

	Execute dbo.People_DeleteIsSmoker
								@IsSmokerPerson
		Select *
		From dbo.People
		WHERE IsSmoker = @IsSmokerPerson;

*/

Begin

		DELETE FROM [dbo].[People]
		WHERE [IsSmoker] = @IsSmokerPerson
			  OR
			  (@IsSmokerPerson IS NULL AND [IsSmoker] IS NULL)


end
GO
