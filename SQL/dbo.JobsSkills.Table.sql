USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[JobsSkills]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobsSkills](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Skill] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_JobsSkills] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobsSkills] ADD  CONSTRAINT [DF_JobsSkills_Skill]  DEFAULT (N'NoSkill') FOR [Skill]
GO
