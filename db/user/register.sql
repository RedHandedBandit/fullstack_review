insert into stack_users (username, password, balance)
values (${user}, ${pass}, 0)
returning username, profile_pic, id, balance;