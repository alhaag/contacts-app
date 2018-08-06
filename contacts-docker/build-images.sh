#!/usr/bin/env bash
#
# Realiza o buld de todas as imagens necessarias para os servicos.
#
# Autor: Andre Luiz Haag

#######################################
# Para todos os containers e remove todas as imagens compiladas por esta
# aplicação.
#
# Globals:
#   None
# Arguments:
#   None
# Returns:
#   None
#######################################
clear()
{
    local img_node=$(docker images -q contacts-node 2> /dev/null)
    if [[ "${img_node}" != "" ]]; then
        docker rmi -f ${img_node}
    fi

    local img_nginx=$(docker images -q contacts-nginx 2> /dev/null)
    if [[ "${img_nginx}" != "" ]]; then
        docker rmi -f ${img_nginx}
    fi
}

#######################################
# Compila imagens a partir dos Dockerfiles.
#
# Globals:
#   None
# Arguments:
#   None
# Returns:
#   None
#######################################
build()
{
    # bild 'tmm-node' image from Dockerfile.node
    docker build --force-rm -t contacts-node - < Dockerfile.node

    # build 'tmm-nginx' image from Dockerfile.nginx
    docker build --force-rm -t contacts-nginx - < Dockerfile.nginx
}

#
# Main
#######################################
clear
build

exit 0