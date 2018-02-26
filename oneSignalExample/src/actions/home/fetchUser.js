import axios from 'axios'

export default fetchUser = () => {
  axios({
    method:'get',
    url:'http://192.168.43.158:3000/users',
  }).then((response) => {
    console.log(response);
  });
}
