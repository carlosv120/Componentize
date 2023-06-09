USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_SelectByManufacturerId]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Cars_SelectByManufacturerId]
											@ManufacturerId int

AS

/*

		Select *
		from	dbo.Cars
	
		declare @ManufacturerId	 int = 1
		Execute dbo.Cars_SelectByManufacturerId
												@ManufacturerId
		

*/


BEGIN

		Select	 c.Id
				,m.Name
				,m.Country
				,c.Model
				,c.Year
				,c.IsUsed
				,c.DateCreated
				,c.DateModified

		From dbo.Cars as c inner join dbo.Manufacturers as m
			on c.ManufacturerId = m.Id

		Where c.ManufacturerId = @ManufacturerId

		



END
GO
