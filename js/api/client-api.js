import $ from 'jquery';

export default (resource) => ({
  api: `http://127.0.0.1:5020/api${resource}`,
  headers: () => localStorage.getItem('jwt') ? {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  } : undefined,

  getAsync(endpoint) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.api + endpoint,
        method: 'GET',
        headers: this.headers(),
        success: (response) => {
          resolve(response);
        },
        error: (xhr, status, error) => {
          reject(`Error: ${error}`);
        }
      });
    });
  },

  postAsync(endpoint, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.api + endpoint,
        method: 'POST',
        headers: this.headers(),
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: (response) => {
          resolve(response);
        },
        error: (xhr, status, error) => {
          reject(`Error: ${error}`);
        }
      });
    });
  },

  patchAsync(endpoint, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.api + endpoint,
        method: 'PATCH',
        headers: this.headers(),
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: (response) => {
          resolve(response);
        },
        error: (xhr, status, error) => {
          reject(`Error: ${error}`);
        }
      });
    });
  },

  deleteAsync(endpoint) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.api + endpoint,
        method: 'DELETE',
        headers: this.headers(),
        success: (response) => {
          resolve(response);
        },
        error: (xhr, status, error) => {
          reject(`Error: ${error}`);
        }
      });
    });
  }
});
