async function loadUserProfile() {
    try {

      const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const userData = await userResponse.json();
      console.log('User:', userData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/; // regular expression 
const email = 'test@example.com';

if (regex.test(email)) {
  console.log('Valid email');
} else {
  console.log('Invalid email');
}

function sendRequest(method, url, body = null) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
  
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(`${method} Response:`, JSON.parse(xhr.responseText));
      } else {
        console.error(`${method} Error:`, xhr.status, xhr.statusText);
      }
    };
  
    xhr.onerror = function () {
      console.error(`${method} Request Failed`);
    };
  
    
  }    
// GET Request
function getAPI() {
    sendRequest('GET', 'https://jsonplaceholder.typicode.com/users/1');
  }
  
  // POST Request
  function postAPI() {
    const data = {
      title: 'Hii',
      body: 'data',
      userId: 1
    };
    sendRequest('POST', 'https://jsonplaceholder.typicode.com/posts', data);
    console.log(data);
  }
  
  // PUT Request
  function putAPI() {
    const data = {
      id: 1,
      title: 'Put title',
      body: 'Put body',
      userId: 1
    };
    sendRequest('PUT', 'https://jsonplaceholder.typicode.com/posts/1', data);
    console.log(data);
  }
  
  // PATCH Request
  function patchAPI() {
    const data = {
      title: 'patch title'
    };
    sendRequest('PATCH', 'https://jsonplaceholder.typicode.com/posts/1', data);
    console.log(data);
  }