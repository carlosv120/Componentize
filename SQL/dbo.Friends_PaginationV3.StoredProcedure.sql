USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_PaginationV3]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_PaginationV3]
										 @PageIndex int 
										,@PageSize int



AS


/*
	Declare  @PageIndex	int		= 0
			,@PageSize	int		= 2

	Execute dbo.Friends_PaginationV3
									 @PageIndex
									,@PageSize


	Select *
	from	dbo.FriendsV2


*/


BEGIN

			Declare @offset int = @PageIndex * @PageSize

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
				,Skills =(
						
							Select	 sk.Id as id
									,sk.Name as name

							from	dbo.Skills as sk inner join dbo.FriendSkills as fs
									on fs.SkillId = sk.Id
							
							where fs.FriendId = f2.Id
							FOR JSON AUTO

								)
				,f2.UserId
				,f2.dateCreated
				,f2.dateModified
				, TotalCount = COUNT(1) OVER()
		

		from	dbo.FriendsV2 as f2 inner join dbo.Images as i
		on f2.PrimaryImageId = i.Id
		
		ORDER BY f2.Id
		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
