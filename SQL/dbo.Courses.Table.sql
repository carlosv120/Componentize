USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[SeasonTermId] [int] NOT NULL,
	[TeacherId] [int] NOT NULL,
 CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Courses] ADD  CONSTRAINT [DF_Courses_Name]  DEFAULT (N'noName') FOR [Name]
GO
ALTER TABLE [dbo].[Courses] ADD  CONSTRAINT [DF_Courses_Description]  DEFAULT (N'noDescription') FOR [Description]
GO
ALTER TABLE [dbo].[Courses] ADD  CONSTRAINT [DF_Courses_SeasonTermId]  DEFAULT ((0)) FOR [SeasonTermId]
GO
ALTER TABLE [dbo].[Courses] ADD  CONSTRAINT [DF_Courses_TeacherId]  DEFAULT ((0)) FOR [TeacherId]
GO
ALTER TABLE [dbo].[Courses]  WITH CHECK ADD  CONSTRAINT [FK_Courses_SeasonTerms] FOREIGN KEY([SeasonTermId])
REFERENCES [dbo].[SeasonTerms] ([Id])
GO
ALTER TABLE [dbo].[Courses] CHECK CONSTRAINT [FK_Courses_SeasonTerms]
GO
ALTER TABLE [dbo].[Courses]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Teachers] FOREIGN KEY([TeacherId])
REFERENCES [dbo].[Teachers] ([Id])
GO
ALTER TABLE [dbo].[Courses] CHECK CONSTRAINT [FK_Courses_Teachers]
GO
