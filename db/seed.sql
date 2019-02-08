create table stack_users {
    id serial primary key,
    username varchar(20) not null unique,
    password varchar(200) not null,
    profile_pic varchar(100),
    balance integer not null
}