// third party
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// icons
import { PersonIcon, PersonGroupIcon } from 'components/icons/IconSet'

const menuDivider = { divider: true }

const menuContact = {
  leftIcon: <PersonIcon />,
  primaryText: 'Todos contatos',
  title: 'Todos os contatos',
  component: Link,
  to: '/'
}

const subheaderGroups = {
  subheader: true,
  primaryText: 'Grupo',
}


export function getMenuItems(IsLoading, groups) {
  let menuItens = []

  menuItens.push(menuContact)
  menuItens.push(menuDivider)
  menuItens.push(subheaderGroups)
  /*groups.rows.map(group => {
    menuItens.push(
      {
        leftIcon: <PersonGroupIcon />,
        primaryText: group.name,
        title: 'Grupo',
        component: Link,
        to: `/contacts/group/${group.id}`,
      }
    )
  })*/
  menuItens.push(
    {
      leftIcon: <PersonGroupIcon />,
      primaryText: 'Outros',
      title: 'Grupo',
      component: Link,
      to: `/contacts/group/${1}`,
    }
  )
  menuItens.push(
    {
      leftIcon: <PersonGroupIcon />,
      primaryText: 'Familia',
      title: 'Grupo',
      component: Link,
      to: `/contacts/group/${2}`,
    }
  )
  menuItens.push(
    {
      leftIcon: <PersonGroupIcon />,
      primaryText: 'Trabalho',
      title: 'Grupo',
      component: Link,
      to: `/contacts/group/${3}`,
    }
  )
  menuItens.push(
    {
      leftIcon: <PersonGroupIcon />,
      primaryText: 'Escola',
      title: 'Grupo',
      component: Link,
      to: `/contacts/group/${4}`,
    }
  )

  return menuItens
}
