// third party
import React, { Component } from 'react'


const DetailOrEmptyMessage = (props) => {

    const { data, emptyText='Não informado' } = props;

    if (data) {
        return <span>{data}</span>
    }

    return <span className="md-text--theme-secondary">{emptyText}</span>
}

export default DetailOrEmptyMessage
