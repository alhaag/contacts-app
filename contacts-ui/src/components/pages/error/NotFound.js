// third party
import React, { Component } from 'react'
import Button from 'react-md/lib/Buttons/Button'
import { withRouter } from 'react-router-dom'
// components
import { SentimentVeryDissatisfiedIcon, ArrowBackIcon } from 'components/icons/IconSet'


@withRouter

class NotFound extends Component {

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
              <SentimentVeryDissatisfiedIcon size={80}/>
            </h1>
            <h2 className="md-display-1">Ops, página não encontrada!</h2>
            <p>Desculpe, a página que você procura pode ter sido movida ou deletada.</p>
            <p>Verifique o endereço buscado e tente novamente.</p>
            <Button
              raised
              primary
              iconEl={<ArrowBackIcon/>}
              onClick={this.handleBack}
            >
              Voltar
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

export default NotFound
