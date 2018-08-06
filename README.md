# Contacts APP

Projeto de exmplo para integração de NodeJS(back-end) e React(front-end) em ambiente docker.

## Como iniciar

```shell
cd contacts-api
yarn install

cd contacts-ui
yarn install

cd contacts-docker
./build-images.sh
docker-compose up --force-recreate

cd contacts-api/data/sql
docker exec -i $(docker ps -f 'name=contactsdocker_mysql_1' -q) mysql --user="root" --password="123456" --default-character-set=utf8 < contacts.sql
```