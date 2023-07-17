const inputArea = document.querySelector('#input');
export const activitySection = document.querySelector('#activity-list');

let activityArray = [];
export const ActivityArray = () => activityArray;
export const setActivityArray = (newArray) => {
  activityArray = newArray;
};
const Form = document.querySelector('form');
if (localStorage.getItem('activities')) {
  activityArray = JSON.parse(localStorage.getItem('activities'));
}
export function MyConstructor(description, completed, index) {
  this.description = description;
  this.completed = completed;
  this.index = index;
}

export const AddToScreen = () => {
  activitySection.innerHTML = '';
  activityArray.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('section', 'listitem');
    li.id = index;

    const span = document.createElement('span');
    span.classList.add('activity', 'td');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = '';
    checkbox.classList.add('check-box');
    checkbox.checked = task.completed;

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('text');
    taskDescription.textContent = task.description;

    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa-solid', 'fa-ellipsis-vertical');

    span.appendChild(checkbox);
    span.appendChild(taskDescription);
    span.appendChild(ellipsis);

    li.appendChild(span);

    activitySection.appendChild(li);
  });
};

if (activityArray.length > 0) {
  AddToScreen();
}

export const saveTaskstoLocalStorage = () => {
  localStorage.setItem('activities', JSON.stringify(activityArray));
};

export const AddtoLocalStorage = () => {
  const description = inputArea.value.trim();
  const completed = false;
  const Index = activityArray.length + 1;
  const Object = new MyConstructor(description, completed, Index);
  activityArray.push(Object);
  saveTaskstoLocalStorage();
  AddToScreen();
};

export const clickToAddNewTask = () => {
  if (inputArea.value !== '') {
    AddtoLocalStorage();
    saveTaskstoLocalStorage();
    AddToScreen();
    Form.reset();
  }
};

export const submitForm = (event) => {
  if (inputArea.value !== '') {
    event.preventDefault();
    AddtoLocalStorage();
    saveTaskstoLocalStorage();
    AddToScreen();
  }
  Form.reset();
};

import {
  ActivityArray, AddToScreen, saveTaskstoLocalStorage, setActivityArray,
} from './AddtoLocalStorage.js';

export const handleCheckboxchange = (event) => {
  const checkbox = event.target;
  if (checkbox.type === 'checkbox') {
    const listItem = checkbox.closest('li');
    const taskId = listItem.getAttribute('id');
    ActivityArray()[taskId].completed = checkbox.checked;
    saveTaskstoLocalStorage();
    if (checkbox.checked) {
      listItem.querySelector('.text').classList.add('completed');
    } else {
      listItem.querySelector('.text').classList.remove('completed');
    }
    saveTaskstoLocalStorage();
  }
};

//   activitleCheckboxchange);
//   activiteTask);
// deleting all checked tasks
export const deleteCheckedTasks = () => {
  setActivityArray(ActivityArray().filter((MyConstructor) => !MyConstructor.completed));
  saveTaskstoLocalStorage();
  AddToScreen();
};
export const reIndex = () => {
  ActivityArray().forEach((task, index) => {
    task.index = index + 1;
  });
};
  // button for dleting all checked tasks
export const cLearALL = () => {
  deleteCheckedTasks();
  reIndex();
  saveTaskstoLocalStorage();
  AddToScreen();
};

const loadActivityArrayFromLocalStorage = () => {
  const activityArrayString = localStorage.getItem('activities');
  if (activityArrayString) {
    return JSON.parse(activityArrayString);
  }
  return [];
};

const activityArray1 = loadActivityArrayFromLocalStorage();

activityArray1.forEach((task, index) => {
  const listItem = document.getElementById(index);
  if (task.completed) {
    listItem.querySelector('.text').classList.add('completed');
  }
});
//   ALL);
import { ActivityArray, AddToScreen, saveTaskstoLocalStorage } from './AddtoLocalStorage.js';

const DeleteTask = (e) => {
  if (e.target.classList.contains('trash')) {
    const listItem = e.target.parentNode.parentNode;
    const taskIndex = listItem.getAttribute('id');
    // const taskIndex = Array.from(listItem.parentNode.children).indexOf(listItem) - 1;
    ActivityArray().splice(taskIndex, 1);
    saveTaskstoLocalStorage();
    AddToScreen();
  }
};
export default DeleteTask;
import { ActivityArray, saveTaskstoLocalStorage } from './AddtoLocalStorage.js';

export const changeHTMLforEdit = (e) => {
  const listItem = e.target.closest('li');
  const index = listItem.getAttribute('id');
  if (e.target.classList.contains('fa-solid')) {
    // Remove the existing list item styling and add the edit class
    listItem.classList.remove('listitem');
    listItem.classList.add('edit');
    const taskId = listItem.getAttribute('id');
    // Create the edit form HTML
    const span = document.createElement('span');
    span.classList.add('activity');
    const input = document.createElement('input');
    input.focus();
    input.type = 'text';
    input.classList.add('input-edit');
    input.value = ActivityArray()[taskId].description;
    const trashIcon = document.createElement('box-icon');
    // trashIcon.addEventListener('click', deLete); // event listener
    trashIcon.setAttribute('name', 'trash-alt');
    trashIcon.setAttribute('type', 'solid');
    trashIcon.classList.add('trash');
    span.appendChild(input);
    span.appendChild(trashIcon);
    // Replace the existing HTML with the edit form HTML
    listItem.innerHTML = '';
    listItem.appendChild(span);
    listItem.querySelector('.input-edit').setAttribute('id', `input-edit-${index}`);
  }
};

export const EditTask = (e) => {
  const parent = e.target.parentNode.parentNode;
  const index = parent.getAttribute('id');
  if (e.key === 'Enter' && e.target.classList.contains('input-edit')) {
    const newDescription = e.target.value;
    // editTask(newDescription, index);
    ActivityArray()[index].description = newDescription;
    saveTaskstoLocalStorage();
    parent.innerHTML = `
      <span class="activity td">
      <input type="checkbox" name="" class="check-box"
      ${ActivityArray()[index].completed ? 'checked' : ''}>
      <span class="text">${ActivityArray()[index].description}</span>
      <i class="fa-solid fa-ellipsis-vertical"></i></span>
  `;
    parent.classList.add('listitem');
    parent.classList.remove('edit');
  }
};

const reFresh = document.querySelector('#refresh');

const reFreshPage = (e) => {
  if (e.target.classList.contains('refresh')) {
    reFresh.setAttribute('animation', 'spin');
    window.location.reload();
    window.addEventListener('load', () => {
      reFresh.setTimeout(() => reFresh.classList.remove('animation'), 4500);
    });
  }
};
export default reFreshPage;