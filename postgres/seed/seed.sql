BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('adarsh', 'adarsh@gmail.com', 5, '2018-01-1')
INSERT into login (hash, email) values ('$2a$10$8z/ZG3p.IqLSb.Id6LN8o.EUoiQKX0Xg2NMyGjEnecfMzFUnjgNKK', 'adarsh@gmail.com');
