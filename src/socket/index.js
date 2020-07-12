export default class MatchaWebsocket {
  constructor(url) {
    this.socket = new WebSocket(url)
    this.socket.onmessage = () => this.route
  }

  authenticate(jwt) {
    this.socket.send(JSON.stringify({token: jwt, method: "authenticate", content: ""}))
    this.jwt = jwt
  }

  route(event) {
    
    console.log(this)
    console.log(event.data)

    let payload = JSON.parse(event.data)
    let method = payload.method

    if (method === "message") {
      
      console.log(this)

    }

  }


  setVue(vue) {
    console.log("vue set", vue)
    this.vue = vue
  }

  receiveMessage() {
    alert("Got a message!")
  }

  sendMessage(message) {
    console.log("asdasd")
    this.socket.send(JSON.stringify({token: this.jwt, method: "sendMessage", content: {to: "all", message: message}}))
  }
}