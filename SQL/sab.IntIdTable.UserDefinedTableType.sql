USE [C127_carlosv.12044_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[IntIdTable]    Script Date: 6/3/2023 9:49:21 PM ******/
CREATE TYPE [sab].[IntIdTable] AS TABLE(
	[Data] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Data] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
