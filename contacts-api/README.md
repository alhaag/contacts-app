# contacts-api

Serviço princial da interface contacts-ui.

Está API deve ser disponibilizada na internet via proxy reverso por meio do Nginx.

## Requisitos

 * yarn ou npm (preferencialmente yarn)
 * node >= 8
 * nodemon (opcional)

## Uso em desenvolvimento

```
$ yarn install
$ mkdir -p data/log
$ yarn start
```

## Uso em produção

Criar diretório de logs:

```
# mkdir -p /var/log/contacts-api
```

Configurar tempo de rotacionamento de logs na crontab:
```
# crontab -e
```

Será aberto o arquivo para edição. Incluir a linha que faz o rotacionamento todo 14º minuto do dia:
```
14 * * * * /usr/sbin/logrotate /home/user/contacts-api/config/logrotate.conf --state /home/user/contacts-api/logrotate-state
```

## Certificado digital

Os certificados são assinados pelo https://letsencrypt.org e gerados / revalidados pelo https://certbot.eff.org/

Para geração de um novo certificado executar o camando a seguir e seguir as instruções da script (a configuração do hostname no nginx já deve existir):

```
# certbot --nginx
```

Para revalidar certificados existentes executar:

```
# certbot renew
```
