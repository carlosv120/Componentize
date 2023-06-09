USE [C127_carlosv.12044_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[CourseV2]    Script Date: 6/3/2023 9:49:21 PM ******/
CREATE TYPE [sab].[CourseV2] AS TABLE(
	[Id] [int] NOT NULL,
	[Credits] [int] NOT NULL,
	[Title] [varchar](100) NULL,
	[DepId] [int] NULL,
	PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
