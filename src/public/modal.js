const showModalBtns = document.querySelectorAll('button.schedules__btn');
const deleteBtn = document.querySelector('#delete-schedule');
const closeModalBtn = document.querySelector('#close-modal');
const modal = document.querySelector('.modal');

function showModal() {
  modal.classList.add('show-modal');
  document.body.style.overflowY = 'hidden';
}

function hideModal() {
  modal.classList.remove('show-modal');
  document.body.style.overflowY = 'auto';
}

showModalBtns.forEach((btn) => btn.addEventListener('click', showModal));
deleteBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', hideModal);
