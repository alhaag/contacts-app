// third party
import React, { Component } from 'react'
import Button from 'react-md/lib/Buttons/Button'
import { withRouter } from 'react-router-dom'
// components
import { NotIterestedIcon, ArrowBackIcon } from 'components/icons/IconSet'


@withRouter

class NotAuthorized extends Component {

  constructor(props) {
    super(props)
    this.handleBack = this.handleBack.bind(this)
  }

  handleBack(event) {
    this.props.history.push("/")
  }

  render() {
    return (
      <section>
        <div className="md-grid md-text-center">
          <div className="md-cell md-cell--12">
            <h1 className="md-display-4">
              <NotIterestedIcon size={80} />
            </h1>
            <h2 className="md-display-1">Ops, você não possui permissão para acessar este conteúdo!</h2>
            <p>Para mais detalhes consulte o administrador.</p>
            <Button
              raised
              primary
              iconEl={<ArrowBackIcon/>}
              onClick={this.handleBack}>
              Voltar
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

export default NotAuthorized
