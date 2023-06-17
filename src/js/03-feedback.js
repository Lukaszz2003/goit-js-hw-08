import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCAL_STORAGE_KEY = 'feedback-form-state';
form.addEventListener(
  'input',
  throttle(e => {
    const save = {
      email: email.value,
      message: message.value,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(save));
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });
  form.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageData = load(LOCAL_STORAGE_KEY);
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}
