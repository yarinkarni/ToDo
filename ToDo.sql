USE [ToDoDB]
GO

/****** Object:  Table [dbo].[Tasks]    Script Date: 20/06/2021 05:49:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Tasks](
	[TaskID] [int] IDENTITY(1,1) NOT NULL,
	[TaskText] [nvarchar](max) NULL,
	[TaskDone] [bit] NULL,
	[TaskDate] [date] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

