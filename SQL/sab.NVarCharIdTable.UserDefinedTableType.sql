USE [C127_carlosv.12044_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[NVarCharIdTable]    Script Date: 6/3/2023 9:49:21 PM ******/
CREATE TYPE [sab].[NVarCharIdTable] AS TABLE(
	[Data] [varchar](128) NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Data] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
