USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_SelectByIdV2]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Cars_SelectByIdV2]
									@Id int

AS

/*

		Select *
		from	dbo.Cars
	
		declare @Id int = 253
		Execute dbo.Cars_SelectByIdV2
										@Id
		

*/


BEGIN
		Select	 c.Id
				,m.Name
				,m.Country
				,c.Model
				,c.Year
				,c.IsUsed
				,Features = (	
								Select   ft.Id as Id
										,ft.Name as Name

								From dbo.Features as ft inner join dbo.CarsFeatures as cft
									on cft.FeatureId = ft.Id

								Where cft.CarId = c.Id
								FOR JSON AUTO
							)
				,c.DateCreated
				,c.DateModified

		From dbo.Cars as c inner join dbo.Manufacturers as m
			on c.ManufacturerId = m.Id

		Where c.Id = @Id

END
GO
