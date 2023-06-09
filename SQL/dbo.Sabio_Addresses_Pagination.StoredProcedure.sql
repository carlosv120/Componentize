USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Sabio_Addresses_Pagination]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Sabio_Addresses_Pagination]
											 @PageIndex int 
											,@PageSize int

AS

/*

	Declare  @PageIndex	int		= 1
			,@PageSize	int		= 2

	Execute dbo.Sabio_Addresses_Pagination
									 @PageIndex
									,@PageSize


	Select *
	from	dbo.Sabio_Addresses
	where	Id<20

*/


BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT [Id]
		  ,[LineOne]
		  ,[SuiteNumber]
		  ,[City]
		  ,[State]
		  ,[PostalCode]
		  ,[IsActive]
		  ,[Lat]
		  ,[Long]
		  , TotalCount = COUNT(1) OVER()
	  FROM [dbo].[Sabio_Addresses]

	  ORDER BY Id
		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY


END
GO
