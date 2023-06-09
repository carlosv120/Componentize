USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Concerts_SelectById]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

			CREATE PROC [dbo].[Concerts_SelectById]
												@Id int

			AS

			BEGIN

				SELECT [Id]
					  ,[Name]
					  ,[Description]
					  ,[IsFree]
					  ,[Address]
					  ,[Cost]
					  ,[DateOfEvent]
				  FROM [dbo].[Concerts]
				WHERE Id = @Id
			END
		
GO
