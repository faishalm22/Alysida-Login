/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     08/11/2021 10:42:56                          */
/*==============================================================*/


drop index USER_PK;

drop table "USER";

drop index VERIFICATION_FK;

drop table VERIFICATION_EMAIL;

/*==============================================================*/
/* Table: "USER"                                                */
/*==============================================================*/
create table "USER" (
   USER_ID              INT4                 not null,
   USERNAME             VARCHAR(20)          null,
   EMAIL                VARCHAR(50)          null,
   NAME                 VARCHAR(50)          null,
   PASSWORD             VARCHAR(255)         null,
   PHONENUMBER          VARCHAR(13)          null,
   CREATED_DATE         DATE                 null,
   UPDATE_DATE          DATE                 null,
   EMAIL_VERIFIED       BOOL                 null,
   IMAGE_FILE           VARCHAR(254)         null,
   IDENTITY_TYPE        VARCHAR(3)           null,
   IDENTITY_NO          VARCHAR(16)          null,
   ADDRESS_KTP          VARCHAR(255)         null,
   DOMISILI             VARCHAR(100)         null,
   constraint PK_USER primary key (USER_ID)
);

/*==============================================================*/
/* Index: USER_PK                                               */
/*==============================================================*/
create unique index USER_PK on "USER" (
USER_ID
);

/*==============================================================*/
/* Table: VERIFICATION_EMAIL                                    */
/*==============================================================*/
create table VERIFICATION_EMAIL (
   USER_ID              INT4                 not null,
   CODE                 VARCHAR(4)           null,
   EXPIRES_AT           DATE                 null
);

/*==============================================================*/
/* Index: VERIFICATION_FK                                       */
/*==============================================================*/
create  index VERIFICATION_FK on VERIFICATION_EMAIL (
USER_ID
);

alter table VERIFICATION_EMAIL
   add constraint FK_VERIFICA_VERIFICAT_USER foreign key (USER_ID)
      references "USER" (USER_ID)
      on delete restrict on update restrict;

