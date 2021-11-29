(()=>{"use strict";class t{constructor(t,e){this.task=t,this.type=e}init(){this.bindToDOM()}static template(t){return`\n\t\t\t<div class="task__card ">\n\t\t\t\t<span class="task__title">${t}</span>\n                <div class="block__button">\n                    <button class="task__edit ">&#9733</button>\n\t\t\t\t    <button class="task__del ">&#10060</button>\n                </div>\n\t\t\t</div>\n`}bindToDOM(){this.tasksBox=document.querySelector(".tasks-box"),this.cardTask=this.addTask(this.task),this.tasksBox.insertAdjacentHTML("beforeend",this.cardTask)}addTask(){const t=document.querySelector(".input-task-name");if(this.task=t.value.trim(),this.task){return this.constructor.template(this.task)}return!1}}class e{getPinCards(){return JSON.parse(localStorage.getItem("pinCards"))||[]}save(t){localStorage.setItem("pinCards",JSON.stringify(t))}}const s=document.getElementById("container"),i=new class{constructor(t){this.container=t,this.board=null}createBoard(){this.board=document.createElement("div"),this.board.classList.add("board"),this.bindToDOM()}static get markup(){return'\n\t<div class="form-container"\n\t<form class="tasks-form">\n\t\t\t<input class="input-task-name" id="task__name" type="text" placeholder="Что будем делать?"  minlength="1">\n\t\t\t<button class="task__add-button">Добавить</button>\n\t\t\t<span class="error hidden">Добавьте текст!<span>\n\t\t\t\n\t\t</form>\n\n\t</div>\n    <div class="pinned-tasks">\n\t\t<span class="pinned-default-text">Нет закреплённых задач</span>\n\t</div>\n    <div class="tasks-box">\n\t<span class="tasks-default-text">Нет задач</span></div>'}bindToDOM(){this.container.insertAdjacentHTML("afterbegin",this.constructor.markup)}}(s),a=new class{constructor(t){this.board=t,this.state=[]}init(){this.board.createBoard(),this.container=document.querySelector("#container"),this.onClickAddCard(),this.addSubscribe(this.container),this.storage=new e,this.state=this.storage.getPinCards(),this.loadState(this.state)}addSubscribe(t){t.addEventListener("click",this.onClickDeleteCard.bind(this)),t.addEventListener("click",this.onClickPinCard.bind(this)),t.addEventListener("click",this.deletePinnedCard.bind(this)),t.addEventListener("keyup",this.keyUp.bind(this)),t.addEventListener("click",this.completionField.bind(this)),t.addEventListener("input",this.onSearchMatches.bind(this))}renderingCard(e){if(""!==e.value)return this.card=new t,this.card.init(),e.value="",document.querySelector(".error").classList.add("hidden"),this.tasksCard&&document.querySelector(".tasks-default-text").classList.add("hidden"),[...this.tasksCard].forEach((t=>t.style.display="flex")),this.card.task}validity(t){""===t.value&&document.querySelector(".error").classList.toggle("hidden")}completionField(t){t.target.classList.contains("input-task-name")&&document.querySelector(".error").classList.add("hidden")}onSearchMatches(t){if(!t.target.classList.contains("input-task-name"))return;this.tasksCard=document.querySelectorAll(".task__card"),""===this.formArea.value&&[...this.tasksCard].forEach((t=>t.style.display="flex"));const e=this.getMatches(this.formArea.value);e&&this.renderMatches(this.tasksCard,e);this.filteredInputName([...this.tasksCard])?document.querySelector(".tasks-default-text").classList.remove("hidden"):document.querySelector(".tasks-default-text").classList.add("hidden")}getMatches(){const t=[];return[...document.querySelectorAll(".task__title")].forEach((e=>{e.textContent.startsWith(this.formArea.value)&&t.push(e)})),t}renderMatches(t,e){[...t].forEach((t=>t.style.display="none")),[...e].forEach((t=>t.parentElement.style.display="flex"))}saveTask(e,s){const i=new t(e,s);this.state.push(i),this.storage.save(this.state)}onClickAddCard(){this.addCardBtn=document.querySelector(".task__add-button"),this.formArea=document.querySelector(".input-task-name"),this.addCardBtn.addEventListener("click",(()=>{if(""===this.formArea.value)return void document.querySelector(".error").classList.remove("hidden");document.querySelector(".error").classList.add("hidden");const t=this.renderingCard(this.formArea);t&&(this.saveTask(t,"task"),this.renderingCard(this.formArea))}))}keyUp(t){if(this.validity(this.formArea),"Enter"===t.key){const t=this.renderingCard(this.formArea);if(!t)return;this.saveTask(t,"task"),this.renderingCard(this.formArea)}}onClickDeleteCard(t){if(t.preventDefault(),t.target.classList.contains("task__del")){if(t.target.classList.contains("task__del")){const e=t.target.parentElement.previousElementSibling.textContent;this.removeItem(this.state,e),t.target.parentElement.closest(".task__card").remove()}this.filteredArr(this.state,this.parentArr,"task")}else document.querySelector(".error").classList.add("hidden")}onClickPinCard(t){if(t.preventDefault(),!t.target.classList.contains("task__edit"))return void document.querySelector(".error").classList.add("hidden");this.pinTitle=t.target.parentElement.previousElementSibling.textContent,this.removeItem(this.state,this.pinTitle),this.saveTask(this.pinTitle,"pin"),t.target.parentElement.closest(".task__card").remove();const e=this.constructor.template(this.pinTitle);document.querySelector(".pinned-default-text").classList.remove("hidden"),document.querySelector(".pinned-tasks").insertAdjacentHTML("beforeend",e),this.filteredArr(this.state,this.parentArr,"task"),this.filteredArr(this.state,this.pinnedArr,"pin")}deletePinnedCard(t){if(t.preventDefault(),!t.target.classList.contains("pin__del"))return void document.querySelector(".error").classList.add("hidden");this.pinTitle=t.target.parentElement.previousElementSibling.textContent,t.target.parentElement.closest(".pin__card").remove(),this.removeItem(this.state,this.pinTitle),this.saveTask(this.pinTitle,"task");const e=this.constructor.templateTask(this.pinTitle);document.querySelector(".tasks-box").insertAdjacentHTML("beforeend",e),this.filteredArr(this.state,this.parentArr,"task"),this.filteredArr(this.state,this.pinnedArr,"pin")}removeItem(t,e){const s=t.findIndex((t=>t.task===e));this.state.splice(s,1),this.storage.save(this.state)}loadState(t){t.forEach((t=>{if("task"===t.type){const e=this.constructor.templateTask(t.task);document.querySelector(".tasks-box").insertAdjacentHTML("beforeend",e)}if("pin"===t.type){const e=this.constructor.template(t.task);document.querySelector(".pinned-tasks").insertAdjacentHTML("beforeend",e)}})),this.parentArr=document.querySelector(".tasks-box"),this.pinnedArr=document.querySelector(".pinned-tasks"),this.filteredArr(this.state,this.parentArr,"task"),this.filteredArr(this.state,this.pinnedArr,"pin")}filteredArr(t,e,s){t.filter((t=>t.type===s)).length>0?e.firstElementChild.classList.add("hidden"):e.firstElementChild.classList.remove("hidden")}filteredInputName(t){const e=t.every((t=>"none"===t.style.display));return t.length>0?document.querySelector(".tasks-default-text").classList.remove("hidden"):document.querySelector(".tasks-default-text").classList.add("hidden"),e}static templateTask(t){return`\n    <div class="task__card ">\n        <span class="task__title">${t}</span>\n        <div class="block__button">\n            <button class="task__edit ">&#9733</button>\n            <button class="task__del ">&#10060</button>\n        </div>\n    </div>\n   `}static template(t){return`\n<div class="pin__card ">\n    <span class="pin__title">${t}</span>\n    <div class="block__button">\n        <button class="pin__del ">&#9733</button>\n    </div>\n</div>\n`}}(i);a.init()})();