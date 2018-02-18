import React, { Component } from 'react';
import axios from '../../../axiosOrders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip'
                },
                value: ''
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: ''
            },
        }
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(resp => {
                this.setState({
                    loading: false
                });

                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                });
            });
    }

    inputChangedHandler = (event, input) => {
        console.log(event.target.value);
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[input]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[input] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm
        });
    }

    render () {
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formElement => {
                    return (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) =>
                                this.inputChangedHandler(event, formElement.id)}
                        />
                    );
                })}
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact info</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
