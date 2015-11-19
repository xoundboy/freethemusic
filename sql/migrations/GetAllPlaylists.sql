DROP PROCEDURE IF EXISTS xoundboy_dev.GetAllTags;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllTags`()
BEGIN
SELECT   *
FROM     tags;
END;