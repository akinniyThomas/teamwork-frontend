import React from 'react';
import Line from './oneline';
import RadioButtons from './RadioButtons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            staffnumber: '',
            address:  '',
            jobrole: '',
            password: '',
            passwordConfirm: '',
            administrator: false,
            employmentdate: '',
            gender: 'male'
            // selectedState: 'male'
            // firstname, lastname, email, password, gender, jobrole, address, staffnumber, employmentdate, administrator
        }
    }

    setEmploymentDate = (date) => this.setState({employmentdate: date});

    setCheckedState = e => this.setState({
        gender: e.target.value
    });

    setData = (name, value) => {
        this.setState({[name]: value});
        // console.log(`${[name]} and ${value}`);
    }

    SignUp = async (e) => {
        e.preventDefault();
        if (this.state.password === this.state.passwordConfirm) {
            const data = this.state;
            const token = this.props.user.token;
            const api = 'http://localhost:8000/api/v1/auth/create-user';
            const response = await fetch(api, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const jsonResponse = await response.json();
            if (jsonResponse.status === 'success') {
                alert('user successfully created');
            }
        }
    }

    render() {
        return(
            <div className="signup">
                <h1
                //  onClick={(e) => this.props.change(3)}
                >Create User</h1>
                <form onSubmit = {this.SignUp}>
                    <Line
                        textlabel = 'FirstName'
                        type = 'text'
                        value = {this.state.firstname}
                        name = 'firstname'
                        data = {this.setData}/>
                    <Line
                        textlabel = 'LastName'
                        type = 'text'
                        value = {this.state.lastname}
                        name = 'lastname'
                        data = {this.setData}/>
                    <Line
                        textlabel = 'Email'
                        type = 'email'
                        value = {this.state.email}
                        name = 'email'
                        data = {this.setData}/>
                    <Line
                        textlabel = 'Staff Number'
                        type = 'text'
                        value = {this.state.staffnumber}
                        name = 'staffnumber'
                        data = {this.setData}/>
                    {/* gender here */}
                    <label>Gender
                        <RadioButtons 
                            selectedState = {this.state.gender}
                            setCheckedState = {this.setCheckedState}
                            valueOne = 'male'
                            valueTwo = 'female'
                            radioOne = 'Male'
                            radioTwo = 'Female'
                            name = 'gender'/>
                    </label>
                    <Line
                        textlabel = 'Job Role'
                        type = 'text'
                        value = {this.state.jobrole}
                        name = 'jobrole'
                        data = {this.setData}/>
                    <Line 
                        textlabel = 'Address'
                        type = 'text'
                        value = {this.state.address}
                        name = 'address'
                        data = {this.setData}/>
                    {/* date here */}
                    <label>Employment Date
                        <DatePicker
                            selected = {this.state.employmentdate}
                            onChange = {this.setEmploymentDate}/>
                    </label>
                    <Line textlabel = 'Administrator?'
                        type = 'checkbox'
                        value = {this.state.administrator}
                        name = 'administrator'
                        data = {this.setData}/>
                    <Line
                        textlabel = 'Password'
                        type = 'password'
                        value = {this.state.password}
                        name = 'password'
                        data = {this.setData}/>
                    <Line
                        textlabel = 'Confirm Password'
                        type = 'password'
                        value = {this.state.passwordConfirm}
                        name = 'passwordConfirm'
                        data = {this.setData}/>

                    <button>Create User</button>
                </form>
            </div>
        );
    }
}

export default SignUp;