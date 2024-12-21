export function play(players) {
  // Проверка на наличие игроков
  if (!Array.isArray(players) || players.length === 0) {
      throw new Error("Список игроков должен быть непустым массивом.");
  }

  let current = 0;
  let currentPlayers = [...players]; // Создаем копию массива игроков

  
  while (currentPlayers.length > 1) { // Продолжаем пока не выявим одного игрока 
      const player = currentPlayers[current];
      player.turn(currentPlayers); // Ход текущего игрока
      currentPlayers = currentPlayers.filter(p => !p.isDead()); // Удаляем выбывших
      if (currentPlayers.length > 0 && player === currentPlayers[current]) { // Если игрок все еще жив, переходим к следующему
          current++;
      }
      if (current >= currentPlayers.length) current = 0; // Переходим к первому игроку
  }
  return currentPlayers[0];   // Возвращаем последнего оставшегося игрока
}
