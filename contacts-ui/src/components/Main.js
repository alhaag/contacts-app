// third party
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavigationDrawer from 'react-md/lib/NavigationDrawers/NavigationDrawer'
// components
import { getMenuItems } from './layout/MenuItems'
import RouteItems from './layout/RouteItems'
import Toast from 'components/layout/Toast'
// icons
import { MenuIcon, ArrowBackIcon} from 'components/icons/IconSet'
// styles
import style from 'styles/main.scss'

class Main extends Component {

  state = {
    loading: true,
  }

  componentDidMount() {
    this.setState({ loading: false })
    document.getElementById("body").classList.remove('unresolved')
    //this.props.fetchContactGroups()
  }

  renderRouteByProps = (item) => {
    return (<item.component />)
  }

  render() {
    const { isLoadingGroups, groups } = this.props
    const { loading } = this.state

    console.log(isLoadingGroups, groups)

    if( loading ) {
      return null
    }
    return (
      <NavigationDrawer
        toolbarTitle="Contatos APP"
        temporaryIcon={<MenuIcon />}
        persistentIcon={<ArrowBackIcon />}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={getMenuItems(/*isLoadingGroups, groups*/)}
        contentId="main-content"
      >
        <Switch key="switch">
          {RouteItems.map(props =>
            <Route
              path={props.to}
              exact={props.exact}
              key={props.to}
              render={() => ( this.renderRouteByProps(props) )}
            />
          )}
        </Switch>
        <Toast/>
      </NavigationDrawer>
    )
  }
}

export default Main
