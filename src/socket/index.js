import state from '@/store'

export default class MatchaWebsocket {
  constructor(url) {
    this.socket = new WebSocket(url)
    this.socket.onmessage = () => this.route
  }

  authenticate(jwt) {
    this.socket.send(JSON.stringify({jwt: jwt, method: "register", content: ""}))
    this.jwt = jwt
    this.socket.onopen = null
  }

  route(event) {

    let payload = JSON.parse(event.data)
    let method = payload.method

    if (method === "message") {
      // console.log(this)
    }
  }

  receiveMessage() {
    alert("Got a message!")
  }

  sendMessage(message) {
    // console.log("asdasd")
    this.socket.send(JSON.stringify({jwt: this.jwt, method: "sendMessage", content: {to: "all", message: message}}))
  }
}