import { Warrior } from './Warrior.js';
import { Axe } from '../weapons/Axe.js';
import { Knife } from '../weapons/Knife.js';

/**
 * Класс Dwarf представляет гнома, наследующего свойства от класса Warrior.
 */
export class Dwarf extends Warrior {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 130; // Текущая жизнь
        this.initialLife = 130; // Начальная жизнь
        this.attack = 15; // Уровень атаки
        this.luck = 20; // Уровень удачи
        this.description = 'Гном'; // Описание класса
        this.weapons = [new Axe(), new Knife()]; // Оружие
        this.hitCount = 0; // Счетчик ударов
    }

    /**
     * Игрок получает урон. Каждый шестой удар уменьшает получаемый урон на половину,
     * если удача больше 0.5.
     * @param {number} damage - Урон, который нужно получить.
     */
    takeDamage(damage) {
        this.hitCount++; // Увеличиваем счетчик ударов
        let takenDamage = damage; // Изначально принимаем полный урон

        // Проверяем условия для уменьшения урона
        if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
            takenDamage /= 2; // Уменьшаем урон вдвое
            this.log(`${this.shortInfo} использует свою удачу и получает только ${takenDamage} урона!`);
        }

        super.takeDamage(takenDamage); // Наносим урон
    }
}
