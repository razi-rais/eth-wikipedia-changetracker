-- You may want to use CreateDatabase.sql script to create an empty database. If you already have a database then this script 
-- will create the tables.

USE [REPLACE_WITH_THE_NAME_OF_EMPTY_DATABASE]

GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Articles](
	[ArticleID] [varchar](max) NOT NULL,
	[Title] [varchar](max) NOT NULL,
	[Url] [varchar](max) NOT NULL,
	[UserID] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Name] [varchar](max) NOT NULL,
	[ID] [varchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
