USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Year] [int] NOT NULL,
	[InventoryId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Books] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Books] ADD  CONSTRAINT [DF_Books_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Books] ADD  CONSTRAINT [DF_Books_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_Books_Inventory] FOREIGN KEY([InventoryId])
REFERENCES [dbo].[Inventory] ([Id])
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_Books_Inventory]
GO
