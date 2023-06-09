USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [sab].[Person_SelectByIds_Nested]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [sab].[Person_SelectByIds_Nested]
			
			@People sab.IntIdTable	READONLY

AS
/*

	Declare @TargetPeople as sab.IntIdTable
		
		Insert into @TargetPeople (Data)			
		Values (1),(5),(99999)

		---Select * from @TargetPeople


	Execute sab.Person_SelectByIds_Nested
								@TargetPeople



*/




BEGIN


	Select	*
	from sab.Person as p left outer join @People as t
	on t.Data = p.PersonId
	Where t.Data is Not Null


END
GO
