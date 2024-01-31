import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let mock = new MockAdapter(axios);

mock.onPost('/login').reply(200, {
    flag: true,
    user: "JJ",
    userId: "1"
});