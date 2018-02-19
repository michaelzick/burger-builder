import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => (
    class extends Component {
        state = {
            err: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.response.use(req => {
                this.setState({
                    err: null
                });
                return req;
            });

            this.respInterceptor = axios.interceptors.response.use(resp => resp, err => {
                this.setState({
                    err: err
                });
            });
        }

        componentWillUnmount () {
            axios.interceptors.response.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errConfirmedHandler = () => {
            this.setState({
                err: null
            });
        }

        render () {
            return (
                <Aux>
                    <Modal
                        show={this.state.err}
                        modalClosed={this.errConfirmedHandler}>
                        {this.state.err ? this.state.err.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
);

export default withErrorHandler;
