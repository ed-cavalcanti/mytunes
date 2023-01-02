import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: false,
    userInfo: [],
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      userInfo: user,
      loading: false,
    });
  }

  render() {
    const { loading, userInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <section>
          {
            loading
              ? <Loading />
              : (
                <div>
                  <h3>{ `${userInfo.name}` }</h3>
                  <img
                    data-testid="profile-image"
                    src={ userInfo.image }
                    alt={ `Foto do usuário ${userInfo.name}` }
                  />
                  <span>{ userInfo.email }</span>
                  <p>{ userInfo.description }</p>
                </div>
              )
          }
        </section>
      </div>
    );
  }
}
