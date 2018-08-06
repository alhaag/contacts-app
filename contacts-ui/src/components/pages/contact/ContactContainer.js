// third party
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
// components
import LoadingPage from 'components/widgets/LoadingPage'

const ContactList = Loadable({loader: () => import(/* webpackChunkName: "contact-list" */ 'components/pages/contact/ContactList'), loading: LoadingPage})
const ContactDetails = Loadable({loader: () => import(/* webpackChunkName: "contact-details" */ 'components/pages/contact/ContactDetails'), loading: LoadingPage})
const ContactEdit = Loadable({loader: () => import(/* webpackChunkName: "contact-edit" */ 'components/pages/contact/ContactEdit'), loading: LoadingPage})
const NotFound = Loadable({loader: () => import(/* webpackChunkName: "not-found" */ 'components/pages/error/NotFound'), loading: LoadingPage})


const ContactContainer = () => (
  <Switch>
    <Route exact path='/' component={ContactList}/>
    <Route path='/contact/details/:id' component={ContactDetails} />
    <Route path='/contact/edit/:id' component={ContactEdit} />
    <Route path='/contact/new' component={ContactEdit} />
    <Route path='*' component={NotFound}/>
  </Switch>
)

export default ContactContainer
