# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
- had_many :groups,through: :members
- has_many :messages
- has_many :members

## membersテーブル
Column|Type|Options|
|------|----|-------|
|user|references|null: false|
|group|references|null: false|
### Associatiuon
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users,through: :members
- has_many :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group|refernces|null: false, foreign_key: true|
|user|refernces|null: false, foreign_key: true|
### Association
- belongs_to :user
- belings_to :group

