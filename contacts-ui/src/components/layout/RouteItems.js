// third party
import Loadable from 'react-loadable'
// components
import LoadingPage from 'components/widgets/LoadingPage'


// Lazy loading
const ContactContainer = Loadable({loader: () => import(/* webpackChunkName: "contact" */ 'components/pages/contact/ContactContainer'), loading: LoadingPage})
const NotFound = Loadable({loader: () => import(/* webpackChunkName: "not-found" */ 'components/pages/error/NotFound'), loading: LoadingPage})
const NotAuthorized = Loadable({loader: () => import(/* webpackChunkName: "not-authorized" */ 'components/pages/error/NotAuthorized'), loading: LoadingPage})

const ROUTE_ITENS = [
  { to: '/',               component: ContactContainer, authRquired:false, exact: true },
  { to: '/contact',        component: ContactContainer, authRquired:false },
  { to: '/nao-autorizado', component: NotAuthorized,    authRquired:false },
  { to: '*',               component: NotFound,         authRquired:false },
]

function proccessRoutesItems() {
    return ROUTE_ITENS
}

export default proccessRoutesItems()
