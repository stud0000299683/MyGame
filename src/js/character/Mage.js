import { Player } from './Player.js';
import { Staff } from '../weapons/Staff.js';
import { Knife } from '../weapons/Knife.js';

/**
 * Класс Mage представляет мага, наследующего свойства от класса Player.
 */
export class Mage extends Player {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 70; // Текущая жизнь
        this.initialLife = 70; // Начальная жизнь
        this.magic = 100; // Текущая магия
        this.initialMagic = 100; // Начальная магия
        this.attack = 5; // Уровень атаки
        this.agility = 8; // Уровень ловкости
        this.description = 'Маг'; // Описание класса
        this.weapons = [new Staff(), new Knife()]; // Оружие
    }

    /**
     * Игрок получает урон. Если магия больше половины начальной,
     * урон уменьшается вдвое, и магия тратится.
     * @param {number} damage - Урон, который нужно получить.
     */
    takeDamage(damage) {
        if (this.magic > this.initialMagic / 2) {
            const reducedDamage = damage / 2; // Уменьшаем урон вдвое
            this.magic -= 12; // Тратим магию
            super.takeDamage(reducedDamage); // Наносим уменьшенный урон
            this.log(`${this.shortInfo} использует магию для уменьшения урона до ${reducedDamage}.`);
        } else {
            super.takeDamage(damage); // Наносим полный урон
        }
    }
}
