import { play } from './game.js';

import log, { clearLog } from './log.js';

import { Archer } from './character/Archer.js';
import { Crossbowman } from './character/Crossbowman.js';
import { Demourge } from './character/Demourge.js';
import { Dwarf } from './character/Dwarf.js';
import { Mage } from './character/Mage.js';
import { Warrior } from './character/Warrior.js';


function makePlayers () {
  return [
    new Archer(1, 'Лучник', log),
    new Crossbowman(8, 'Арбалетчик', log),
    new Demourge(5, 'Демиург', log),
    new Dwarf(12, 'Гном', log),
    new Mage(3, 'Маг', log),
    new Warrior(7, 'Воин', log)
  ];
}

document.getElementById('clearLog').addEventListener('click', () => {
  clearLog();
});

document.getElementById('start-game').addEventListener('click', () => {
  clearLog();

  const players = makePlayers();
  log('Игроки созданы');
  players.forEach(player => player.logSelf());

  const winner = play(players, log);
  log(`ПОБЕДИЛ: ${winner.shortInfo}`);
});


