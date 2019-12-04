
# Commandes utiles !

## Save

```bash
docker exec projetnodejs_db /usr/bin/mysqldump -u root --password=password Company > backup.sql
```

## Restore

```bash
cat backup.sql | docker exec -i projetnodejs_db /usr/bin/mysql -u root --password=password Company
```

## Create Docker Image mymysql

```bash
docker image build -t mymysql .
```

## Create and run Docker-Compose with mymysql

```bash
docker-compose up
```

## Import DB

```bash
docker exec -i projetnodejs_db mysql -u root --password=password mysql < company.sql
```