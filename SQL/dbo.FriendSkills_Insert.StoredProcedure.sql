USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[FriendSkills_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[FriendSkills_Insert]
										@batchSkills dbo.BatchSkills READONLY


AS

/*
		Declare @newSkill dbo.BatchSkills
		insert into @newSkill(Name)
			Values ('Collaborative')



		select *
		from @newSkill

		Execute dbo.FriendSkills_Insert
										@newSkill


*/

/*
	----TO CALL THIS FUNCTION FROM ANOTHER FUNCTION ADD THIS TO THE BEGINNING
	----@batchSkills dbo.BatchSkills READONLY


	----ADD THIS TO THE FUNCTION BEGIN-END
	----Execute dbo.FriendSkills_Insert @newSkill

*/


BEGIN
		
		Declare @SkillId	int		= 0

		insert into dbo.Skills(Name)

		Select nsk.Name
			from @batchSkills as nsk    --from @newSkill thats executed
			where Not Exists (	Select 1
								From dbo.Skills as sk
								where sk.Name = nsk.Name)
										
										--The entire function is modified by the where clause
										--It is ONLY going to select the values that dont exist
										--and insert them into skills following the condition
										--We are selecting the values that dont exist.
		
		set @SkillId = SCOPE_IDENTITY()


END




DELETE FROM [dbo].[Skills]
      WHERE Id >10


DELETE FROM [dbo].[FriendSkills]
      WHERE FriendId >42


GO
