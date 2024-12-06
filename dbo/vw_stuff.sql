CREATE VIEW vw_stuff AS
    SELECT 
       *
FROM stuff
WHERE date_deleted IS NULL
ORDER BY id ASC;