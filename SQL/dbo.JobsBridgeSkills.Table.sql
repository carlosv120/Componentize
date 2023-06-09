USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[JobsBridgeSkills]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobsBridgeSkills](
	[JobId] [int] NOT NULL,
	[SkillId] [int] NOT NULL,
 CONSTRAINT [PK_JobsBridgeSkills] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC,
	[SkillId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobsBridgeSkills]  WITH CHECK ADD  CONSTRAINT [FK_JobsBridgeSkills_Jobs] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[JobsBridgeSkills] CHECK CONSTRAINT [FK_JobsBridgeSkills_Jobs]
GO
ALTER TABLE [dbo].[JobsBridgeSkills]  WITH CHECK ADD  CONSTRAINT [FK_JobsBridgeSkills_JobsSkills] FOREIGN KEY([SkillId])
REFERENCES [dbo].[JobsSkills] ([Id])
GO
ALTER TABLE [dbo].[JobsBridgeSkills] CHECK CONSTRAINT [FK_JobsBridgeSkills_JobsSkills]
GO
