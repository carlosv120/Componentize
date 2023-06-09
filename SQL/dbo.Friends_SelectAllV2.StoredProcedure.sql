USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectAllV2]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_SelectAllV2]

AS

/*

		Execute dbo.Friends_SelectAllV2

*/



Begin
		
	Select	 f2.id
			,f2.title
			,f2.bio
			,f2.summary
			,f2.headline
			,f2.slug
			,f2.statusId
			,i.Id
			,i.TypeId
			,i.Url
			,f2.UserId
			,f2.dateCreated
			,f2.dateModified
	
	from	dbo.FriendsV2 as f2 inner join dbo.Images as i
			on f2.PrimaryImageId = i.Id


End
GO
