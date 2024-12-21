import { Archer } from './Archer.js';
import { LongBow } from '../weapons/LongBow.js';
import { Knife } from '../weapons/Knife.js';

/**
 * Класс Crossbowman представляет арбалетчика, наследующего свойства от класса Archer.
 */
export class Crossbowman extends Archer {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 85; // Текущая жизнь
        this.initialLife = 85; // Начальная жизнь
        this.attack = 8; // Уровень атаки
        this.agility = 20; // Уровень ловкости
        this.luck = 15; // Уровень удачи
        this.description = 'Арбалетчик'; // Описание класса
        this.weapons = [
            new LongBow(), // Оружие: длинный лук
            new Knife() // Оружие: нож
        ];
    }

    /**
     * Метод для получения урона в зависимости от расстояния до цели.
     * Можно добавить уникальную логику для арбалетчика, если это необходимо.
     * @param {number} distance - Расстояние до цели.
     * @returns {number} - Урон.
     */
    getDamage(distance) {
        const baseDamage = super.getDamage(distance); // Получаем базовый урон от родительского класса
        // Здесь можно добавить дополнительную логику, специфичную для арбалетчика
        return baseDamage;
    }
}
