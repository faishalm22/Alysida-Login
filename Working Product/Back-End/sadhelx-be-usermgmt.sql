create table IF NOT EXISTS tbl_mstr_user
(
    user_id        bigint  not null
        constraint tbl_mstr_user_pkey
            primary key,
    username       varchar not null,
    email          varchar not null,
    name      varchar not null,
    phonenumber    varchar not null,
    password       varchar not null,
    created_date   timestamp,
    updated_date   timestamp,
    email_verified boolean,
    image_file     varchar,
    identity_type  varchar,
    identity_no    varchar,
    address_ktp    varchar,
    domisili       varchar
);

alter table tbl_mstr_user
    owner to sadhelx_usr;


create table IF NOT EXISTS tbl_trx_verification_email
(
    id         serial    not null
        constraint tbl_trx_verification_email_pkey
            primary key,
    email      varchar   not null,
    code       varchar   not null,
    type       integer   not null,
    expires_at timestamp not null
);

alter table tbl_trx_verification_email
    owner to sadhelx_usr;
