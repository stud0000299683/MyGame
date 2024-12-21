import { Mage } from './Mage.js';
import { StormStaff } from '../weapons/StormStaff.js';
import { Knife } from '../weapons/Knife.js';

/**
 * Класс Demourge представляет демиурга, наследующего свойства от класса Mage.
 */
export class Demourge extends Mage {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 80; // Текущая жизнь
        this.initialLife = 80; // Начальная жизнь
        this.magic = 120; // Текущая магия
        this.initialMagic = 120; // Начальная магия
        this.attack = 6; // Уровень атаки
        this.luck = 12; // Уровень удачи
        this.description = 'Демиург'; // Описание класса
        this.weapons = [new StormStaff(), new Knife()]; // Оружие
    }

    /**
     * Вычисляет урон в зависимости от расстояния до цели.
     * Если у демиурга есть магия и удача больше 0.6, урон увеличивается на 50%.
     * @param {number} distance - Расстояние до цели.
     * @returns {number} - Урон.
     */
    getDamage(distance) {
        const baseDamage = super.getDamage(distance); // Получаем базовый урон от родительского класса
        if (this.magic > 0 && this.getLuck() > 0.6) { // Увеличиваем урон на 50%, если условия выполнены
            const boostedDamage = baseDamage * 1.5;
            this.log(`${this.shortInfo} использует магию для увеличения урона до ${boostedDamage}.`, 'purple', './images/magic_up.jpg');
            return boostedDamage;
        }
        return baseDamage; // Возвращаем базовый урон, если условия не выполнены
    }
}
