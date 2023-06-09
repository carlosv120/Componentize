USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [sab].[Person_SelectByIds]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [sab].[Person_SelectByIds]
			
			@People sab.IntIdTable	READONLY

AS
/*

	Declare @TargetPeople as sab.IntIdTable
		
		Insert into @TargetPeople (Data)			
		Values (1),(5),(99999)

		---Select * from @TargetPeople


	Execute sab.Person_SelectByIds
								@TargetPeople



*/




BEGIN




/*
	Select	*

	from sab.Person as p inner join @People as t    --t for target
		on t.Data = p.PersonId

*/

	Execute sab.Person_SelectByIds_Nested @People  ---@People is a list of people




	------SAME RESULTS but with left outer join
	-- from sab.Person as p left outer join @People as t
	--on t.Data = p.PersonId
	--Where t.Data is Not Null




	/*
	---TO FILTER PEOPLE WITH A CONDITION

	Declare @FilteredPeople sab.IntIdTable

	Insert into @FilteredPeople (Data)
	Select Data
	From @People as p
	where p.Data < 11

	Select	*
	from sab.Person as p left outer join @FilteredPeople as t
	on t.Data = p.PersonId
	Where t.Data is Not Null

	*/


END
GO
