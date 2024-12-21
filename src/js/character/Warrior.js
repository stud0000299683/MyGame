import { Player } from './Player.js';
import { Sword } from '../weapons/Sword.js';
import { Knife } from '../weapons/Knife.js';

/**
 * Класс Warrior представляет воина, наследующего свойства от класса Player.
 */
export class Warrior extends Player {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 120; // Текущая жизнь
        this.initialLife = 120; // Начальная жизнь
        this.speed = 2; // Скорость перемещения
        this.attack = 10; // Уровень атаки
        this.description = 'Воин'; // Описание класса
        this.weapons = [new Sword(), new Knife()]; // Оружие
    }

    /**
     * Игрок получает урон. Если жизнь меньше половины и удача больше 0.8,
     * используется магия для уменьшения урона.
     * @param {number} damage - Урон, который нужно получить.
     */
    takeDamage(damage) {
        if (this.life < this.initialLife / 2 && this.getLuck() > 0.8) {
            const fromMagic = Math.min(damage, this.magic); // Используем магию для уменьшения урона
            this.magic -= fromMagic; // Уменьшаем запасы магии
            super.takeDamage(damage - fromMagic); // Наносим оставшийся урон
        } else {
            super.takeDamage(damage); // Наносим полный урон
        }
    }
}
