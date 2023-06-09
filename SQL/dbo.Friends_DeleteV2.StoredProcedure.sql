USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_DeleteV2]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE proc [dbo].[Friends_DeleteV2]

								@Id int
AS

/*

		Declare @Id int = 641


		Select *
		from	dbo.FriendsV2 as f2 inner join dbo.Images as i
		on f2.PrimaryImageId = i.Id
			
		
		Execute dbo.Friends_DeleteV2
									@Id

		Select *
		from	dbo.FriendsV2 as f2 inner join dbo.Images as i
		on f2.PrimaryImageId = i.Id

*/





BEGIN
		Declare @ImageId	int		=(select PrimaryImageId
									  from	dbo.FriendsV2
									  where Id = @Id)	
		
/*		Declare @SkillsId int = (select Id
								 from dbo.FriendsV2
								 where Id = @Id)


		DELETE FROM [dbo].[FriendSkills]
			  WHERE FriendId = @Id

*/

		DELETE FROM [dbo].[FriendsV2]
			  WHERE Id = @Id

		DELETE FROM [dbo].[Images]
			  WHERE Id = @ImageId



END
GO
