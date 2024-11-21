// import React, { Component } from 'react'
// import UserService from '../services/UserService';

// class CreateUserComponent extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             // step 2
//             id: this.props.match.params.id,
//             firstName: '',
//             lastName: '',
//             email: ''
//         }
//         this.changeFirstNameHandler =
//             this.changeFirstNameHandler.bind(this);
//         this.changeLastNameHandler =
//             this.changeLastNameHandler.bind(this);
//         this.saveOrUpdateUser =
//             this.saveOrUpdateUser.bind(this);
//     }

//     // step 3
//     componentDidMount() {

//         // step 4
//         if (this.state.id === '_add') {
//             return
//         } else {
//             UserService.getUserById(this.state.id).then((res) => {
//                     let user = res.data;
//                     this.setState({
//                         firstName: user.firstName,
//                         lastName: user.lastName,
//                         email: user.email
//                     });
//                 });
//         }
//     }
//     saveOrUpdateUser = (e) => {
//         e.preventDefault();
//         let user = {
//             firstName: this.state.firstName, lastName:
//                 this.state.lastName, email: this.state.email
//         };
//         console.log('user => ' + JSON.stringify(user));

//         // step 5
//         if (this.state.id === '_add') {
//             UserService.createUser(user).then(res => {
//                 this.props.history.push('/users');
//             });
//         } else {
//             UserService.updateUser(user, this.state.id).then(res => {
//                 this.props.history.push('/users');
//             });
//         }
//     }

//     changeFirstNameHandler = (event) => {
//         this.setState({ firstName: event.target.value });
//     }

//     changeLastNameHandler = (event) => {
//         this.setState({ lastName: event.target.value });
//     }

//     changeEmailHandler = (event) => {
//         this.setState({ email: event.target.value });
//     }

//     cancel() {
//         this.props.history.push('/users');
//     }

//     getTitle() {
//         if (this.state.id === '_add') {
//             return <h3 className="text-center">Add User</h3>
//         } else {
//             return <h3 className="text-center">Update User</h3>
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <br></br>
//                 <div className="container">
//                     <div className="row">
//                         <div className="card col-md-6 offset-md-3 offset-md-3">
//                             {
//                                 this.getTitle()
//                             }
//                             <div className="card-body">
//                                 <form>
//                                     <div className="form-group">
//                                         <label> First Name: </label>
//                                         <input placeholder="First Name"
//                                             name="firstName" className="form-control"
//                                             value={this.state.firstName}
//                                             onChange={this.changeFirstNameHandler} />
//                                     </div>
//                                     <div className="form-group">
//                                         <label> Last Name: </label>
//                                         <input placeholder="Last Name"
//                                             name="lastName" className="form-control"
//                                             value={this.state.lastName}
//                                             onChange={this.changeLastNameHandler} />
//                                     </div>
//                                     <div className="form-group">
//                                         <label> Email : </label>
//                                         <input placeholder="Email Address"
//                                             name="email" className="form-control"
//                                             value={this.state.email}
//                                             onChange={this.changeEmailHandler} />
//                                     </div>

//                                     <button className="btn btn-success"
//                                         onClick={this.saveOrUpdateUser}>Save
//                                     </button>
//                                     <button className="btn btn-danger"
//                                         onClick={this.cancel.bind(this)}
//                                         style={{ marginLeft: "10px" }}>Cancel
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default CreateUserComponent

import React, { Component } from 'react';
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: '',
            errors: {} // State to hold validation errors
        };

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== '_add') {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                });
            });
        }
    }

    validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!this.state.firstName.trim()) {
            isValid = false;
            errors['firstName'] = 'First name is required.';
        } else if (!/^[a-zA-Z\s]+$/.test(this.state.firstName)) {
            isValid = false;
            errors['firstName'] = 'First name can only contain letters and spaces.';
        }
    
        // Ensure lastName is not empty and contains only valid characters
        if (!this.state.lastName.trim()) {
            isValid = false;
            errors['lastName'] = 'Last name is required.';
        } else if (!/^[a-zA-Z\s]+$/.test(this.state.lastName)) {
            isValid = false;
            errors['lastName'] = 'Last name can only contain letters and spaces.';
        }
    
        // Ensure email is valid
        if (!this.state.email.trim()) {
            isValid = false;
            errors['email'] = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            isValid = false;
            errors['email'] = 'Email is not valid.';
        }
    
        this.setState({ errors });
        return isValid;
    };

    saveOrUpdateUser = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            let user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            };
            console.log('user => ' + JSON.stringify(user));

            if (this.state.id === '_add') {
                UserService.createUser(user).then(res => {
                    this.props.history.push('/users');
                });
            } else {
                UserService.updateUser(user, this.state.id).then(res => {
                    this.props.history.push('/users');
                });
            }
        }
    };

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    };

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    };

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    };

    cancel() {
        this.props.history.push('/users');
    }

    getTitle() {
        return this.state.id === '_add'
            ? <h3 className="text-center">Add User</h3>
            : <h3 className="text-center">Update User</h3>;
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input
                                            placeholder="First Name"
                                            name="firstName"
                                            className="form-control"
                                            value={this.state.firstName}
                                            onChange={this.changeFirstNameHandler}
                                        />
                                        {this.state.errors.firstName && (
                                            <div className="text-danger">{this.state.errors.firstName}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input
                                            placeholder="Last Name"
                                            name="lastName"
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={this.changeLastNameHandler}
                                        />
                                        {this.state.errors.lastName && (
                                            <div className="text-danger">{this.state.errors.lastName}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label> Email: </label>
                                        <input
                                            placeholder="Email Address"
                                            name="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.changeEmailHandler}
                                        />
                                        {this.state.errors.email && (
                                            <div className="text-danger">{this.state.errors.email}</div>
                                        )}
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={this.cancel.bind(this)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUserComponent;

