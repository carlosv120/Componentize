USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[SeasonTerms]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SeasonTerms](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Term] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_SeasonTerms] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[SeasonTerms] ADD  CONSTRAINT [DF_SeasonTerms_Term]  DEFAULT (N'noTerm') FOR [Term]
GO
