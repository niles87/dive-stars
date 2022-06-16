SELECT
    AVG(duration) :: INT AS average_duration
FROM
    dives
WHERE
    location_id = 1
GROUP BY
    location_id;