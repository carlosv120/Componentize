USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Delete]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[TechCompanies_Delete]
									@Id int
AS

/*

	DECLARE @Id int = 6

		SELECT *
		FROM dbo.TechCompanies	as tc inner join dbo.TechCompaniesImages as ti
		ON	tc.PrimaryImageId = ti.id

	EXECUTE dbo.TechCompanies_Delete
									@Id

		SELECT *
		FROM dbo.TechCompanies	as tc inner join dbo.TechCompaniesImages as ti
		ON	tc.PrimaryImageId = ti.id
*/



BEGIN

		DECLARE @ImageId	int	=(SELECT	PrimaryImageId
								  FROM		dbo.TechCompanies
								  WHERE		Id = @Id)


		DELETE FROM [dbo].[TechCompaniesBrigdeTags]
			  WHERE TechCompanyId = @Id

		DELETE FROM [dbo].[TechCompanies]
			  WHERE Id = @Id

		DELETE FROM [dbo].[TechCompaniesImages]
			  WHERE Id = @ImageId




END
GO
