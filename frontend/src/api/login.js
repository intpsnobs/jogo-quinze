import axios from 'axios';

export default (state) => {
    if(state.username.length && state.password.length) {
        const payload = {
            "username": state.username,
            "password": state.password,
        }
        axios.post('http://localhost:3333/login', payload)
            .then(function (response) {
                if(response.status === 200){
                    return 'success';
                } else{
                    return 'error';
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
    }
    
}