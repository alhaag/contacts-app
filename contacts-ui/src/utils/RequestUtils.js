
class RequestUtils {

  /**
   * Obtem o protocolo atual da conexão com o servidor, http ou https
   *
   * @returns {string}
   */
  static currentProtocol() {
    return location.protocol
  }

  /**
   * Retorna headers comuns a todas as requisições a API.
   *
   * @returns {Object}
   */
  static defaultHeaders() {
    return {
      'Content-Type': 'application/json',
    }
  }

  /**
   * Gera URL com protocolo e acrescenta um objeto de parâmetros em forma de
   * query string caso exista o parâmetro 'params'.
   *
   * @param {string} endPoint URL sem protocolo.
   * @param {object} params Objeto chave/valor que deve ser parseado em query string
   *
   * @returns {string} URL completa acrescida dos parâmetros
   */
  static fetchURL(endPoint, paramsObject) {
    let url = `${this.currentProtocol()}${endPoint}`
    if (!paramsObject) {
      return url
    }
    let urlObj = new URL(url),
      params = paramsObject
    Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]))
    return urlObj
  }

  /**
   * Tratamento da reposta e erros de requisições a API.
   *
   * @param {Object} res Resposta recebida da API sem tratamento ou parse
   * @param {Object} errorsByCode Sobreescrita de mensagens de erro padrão de acordo com o código.
   */
  static responseHandler(dispatch, responseCode, json, errorsByCode) {
    let err400 = errorsByCode.err400 || 'Erro nos parâmetros da requisição.'
    let err500 = errorsByCode.err500 || 'Requisição retornou erro.'
    let err401 = errorsByCode.err401 || 'Sessão expirada.'
    let err403 = errorsByCode.err403 || 'Sem permisão para acessar este recurso.'
    let err404 = errorsByCode.err404 || 'Recurso inexistente.'
    let errDefault = errorsByCode.errDefault || 'Erro desconhecido ao realizar requisição.'

    switch (responseCode) {
      case 200:
        return json
      case 400:
        throw new Error(err400)
      case 500:
        throw new Error(err500)
      case 401:
        throw new Error(err401)
      case 403:
        throw new Error(err403)
      case 404:
        throw new Error(err404)
      default:
        throw new Error(errDefault)
    }
  }

}

export default RequestUtils
