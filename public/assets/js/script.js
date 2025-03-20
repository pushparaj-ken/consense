// $('body').on("submit", '.password-form', function (e) {
//   e.preventDefault();
//   debugger;
//   $.ajax({
//     type: "POST",
//     url: '/stakeholder/api/v1/resetpassword',
//     dataType: "json",
//     contentType: "application/json",
//     data: new FormData(this),
//     success: function (res) {
//       window.location.href = '/stakeholder/login';
//     },
//     error: function (xhr, status, error) {
//     }
//   });
// });
$('.error-span').hide();
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.password-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const password = form.querySelector('input[name="password"]').value;
    if (password != '') {
      const password = form.querySelector('input[name="password"]').value;
      if (password != '') {
        const token = form.querySelector('input[name="token"]').value;
        const data = {
          password: password,
          token: token
        }
        fetch('/api/users/resetPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(response => response.json()).then(data => {
          console.log('Success:', data);
          if (data.code === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Password reset successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              //window.location.href = '/stakeholder/login';
              location.reload()
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }).catch((error) => {
          // Handle error response
          console.error('Error:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Password reset failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      } else {
        $('.error-span').show();
        Swal.fire({
          title: 'Warning!',
          text: 'Password reset failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      Swal.fire('Validation Error!', 'Please check the required fields.', 'warning');
    }
  });



});