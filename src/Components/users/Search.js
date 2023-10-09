import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers : PropTypes.func.isRequired,
        showClear : PropTypes.bool.isRequired,
        setAlert : PropTypes.func.isRequired,
    }

      // This method is used to dynamically update state whenever text input changes in the search form
      onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e =>{
        e.preventDefault();
        if(this.state.text === ''){
            this.props.setAlert('Please enter a username', 'light')
        }else{
            
            this.props.searchUsers(this.state.text);
            this.setState({text:''});
        }
    }


  render() {

    const {showClear, clearUsers} = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
            <input type="text" name="text" placeholder='Search Users'
                value={this.state.text}
                onChange={this.onChange}
            />
            <input type="submit" value="Search" className="btn btn-dark btn-block"/>
        </form>
        {showClear && (
            <button onClick={clearUsers} className="btn btn-light btn-block">Clear</button>)}
      </div>
    )
  }
}

export default Search
