import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = form.querySelector('input[name="delay"]');
const inputRatio = form.querySelectorAll('input[name="state"]');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const selectedState = Array.from(inputRatio).find(input => input.checked);

  const delay = parseInt(inputDelay.value, 10);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState.value === 'fulfilled') {
        resolve(delay);
        return;
      }
      reject(delay);
    }, delay);
  })
      
    promise.then(delay => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
