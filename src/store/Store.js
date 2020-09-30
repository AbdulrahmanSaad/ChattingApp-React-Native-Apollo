import { decorate, observable, action } from "mobx";
import axios from 'axios'

class Store {

    email = ''
    password = ''
    token = ''

    newArr = []

    setEmail = (data) => {
        this.email = data
    }

    setPassword = (data) => {
        this.password = data
    }

    login = async () => {
        await axios.post('http://192.168.1.9:8000/api/login', {
            email: this.email,
            password: this.password
        }).then((response) => {
            this.token = response.data
        })
    }

    messages = null

    setData = (data) => {
        data.reverse()
        this.messages = data
    }

    getMessages = () => {
        axios.get('http://192.168.1.9:8000/api/fetchMessages', {
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).then((response) => { this.setData(response.data) })
    }

    messageText = ''

    setMessage = (data) => {
        this.messageText = data
    }

    sendMessage = () => {
        axios({
            method: 'Post',
            url: 'http://192.168.1.9:8000/api/sendMessages',
            data: {
                message: this.messageText
            },
            headers: {
                'Authorization': 'Bearer ' + this.token,
            }
        }).then(() => {
            this.messageText = ''
        })
    }

    addMessage = (message) => {
        this.messages.unshift(message)
    }
}

decorate(Store, {
    messages: observable,
    getMessages: action,
    setData: action,
    messageText: observable,
    sendMessage: action,
    email: observable,
    password: observable,
    setEmail: action,
    setPassword: action,
    login: action,
    token: observable,
    addMessage: action,
    newArr: observable
})

export default new Store()