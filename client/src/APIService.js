export default class APIService {
    static InsertUser(email, password) {
        const requestBody = {
            email: email,
            password: password
        };
        return fetch('http://127.0.0.1:5000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            console.log(response.status);
            return response.json();
        })
    }

    static LoginUser(email, password) {
        const requestBody = {
            email: email,
            password: password
        };
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            console.log(response)
            return response.json();
        })
    }
}