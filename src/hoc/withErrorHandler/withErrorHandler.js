import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => (
    class extends Component {
        state = {
            err: null
        }

        componentWillMount () {
            axios.interceptors.response.use(req => {
                this.setState({
                    err: null
                });
                return req;
            });

            axios.interceptors.response.use(res => res, err => {
                this.setState({
                    err: err
                });
            });
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
                    <WrappedComponent />
                </Aux>
            );
        }
    }
);

export default withErrorHandler;
