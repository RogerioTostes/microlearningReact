import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from 'firebase';
import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  componentDidMount() {
    const config = {
        apiKey: "AIzaSyDHM_im-erbsPVgQOWSQ_j-l1KJPuzdD1k",
        authDomain: "cadastro-f48eb.firebaseapp.com",
        databaseURL: "https://cadastro-f48eb.firebaseio.com",
        projectId: "cadastro-f48eb",
        storageBucket: "",
        messagingSenderId: "234844262067"
      };
      firebase.initializeApp(config);
    }

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  tryLogin() {
            
            const { email, password } = this.state
    
            firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
           console.log('Usuário autenticado', user)
// //            this.setState({ message: 'Sucesso'})
//             const action = userLoginSuccess(user);
//             dispatch(action);
//             return user; 
        })
        .catch(error => {
            // if (error.code === 'auth/user-not-found') {
            //     return new Promise((resolve, reject) => {
            //         Alert.alert('Usuário não encontrado',
            //         'Deseja cadastrar um novo usuário?',
            //         [{
            //             text: 'Não',
            //             onPress: () => resolve()
            //         },
            //         {
            //             text: 'Sim', 
            //             onPress: () => {
            //                 firebase
            //                     .auth()
            //                     .createUserWithEmailAndPassword(mail, password)
            //                     .then(user => { resolve(user) })
            //                     .catch(error => { reject (error) })
            //             } 
            //         }],
            //         { cancelable: false }
            //         ) 
            //     })
            // }
           console.log('erro',error);
        })
        }


  render() {
      return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Airbnb logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button 
          onClick={()=> this.tryLogin()}
          type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
