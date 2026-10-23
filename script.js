'use strict';
const states = [
  {name:'home', description:'Return to the centered, bent-arm pose with the extension nearly retracted.', event:'reach', next:'reach_left'},
  {name:'reach_left', description:'Turn toward positive yaw, open the elbow, and extend the sliding segment to reach outward.', event:'lift', next:'lift'},
  {name:'lift', description:'Keep the yaw direction, raise the arm through the shoulder joint, and retract the extension.', event:'sweep', next:'reach_right'},
  {name:'reach_right', description:'Sweep to negative yaw while changing the shoulder and elbow pose; then return home.', event:'return', next:'home'}
];
document.querySelectorAll('[data-state]').forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.state), state = states[index];
    document.querySelectorAll('[data-state]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-row]').forEach(row => row.classList.toggle('selected', Number(row.dataset.row) === index));
    document.getElementById('state-counter').textContent = 'STATE ' + String(index+1).padStart(2,'0');
    document.getElementById('state-name').textContent = state.name;
    document.getElementById('state-description').textContent = state.description;
    const edge = document.getElementById('state-edge');
    const event = document.createElement('code'), next = document.createElement('code');
    event.textContent = state.event; next.textContent = state.next;
    edge.replaceChildren('On arrival: ', event, ' → ', next);
  });
});
