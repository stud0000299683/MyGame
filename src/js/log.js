const logContainer = document.getElementById('game-area');

function log(message, color = 'green', imageUrl = '') {
  const messageHTML = `<p class='message ${color}'>${imageUrl ? `<img src="${imageUrl}" alt="Weapon" class="weapon-icon">` : ''}${message}</p>`;
  logContainer.insertAdjacentHTML('beforeend', messageHTML);
}

export function clearLog() {
  logContainer.innerHTML = '';
}

export default log;
