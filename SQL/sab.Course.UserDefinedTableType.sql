USE [C127_carlosv.12044_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[Course]    Script Date: 6/3/2023 9:49:21 PM ******/
CREATE TYPE [sab].[Course] AS TABLE(
	[Credits] [int] NOT NULL,
	[Title] [varchar](100) NULL,
	[DepId] [int] NULL
)
GO
