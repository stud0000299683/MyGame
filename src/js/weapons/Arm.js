import { Weapon } from './Weapon.js';

/**
 * Класс Arm представляет руку, наследующую свойства от класса Weapon.
 */
export class Arm extends Weapon {
    /**
     * Создает экземпляр руки.
     * @param {string} name - Название.
     * @param {number} attack - Уровень атаки.
     * @param {number} durability - Прочность (по умолчанию бесконечная).
     * @param {number} range - Дальность действия.
     */
    constructor(
        name = 'Рука',
        attack = 1,
        durability = Infinity,
        range = 1
    ) {
        // Проверка входных параметров
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Имя должно быть непустой строкой.');
        }
        if (typeof attack !== 'number' || attack < 0) {
            throw new Error('Атака должна быть неотрицательным числом.');
        }
        if (typeof durability !== 'number') {
            throw new Error('Прочность должна быть числом.');
        }
        if (typeof range !== 'number' || range < 0) {
            throw new Error('Дальность должна быть неотрицательным числом.');
        }

        super(name, attack, durability, range); // Передаем параметры в родительский класс
    }

    // Удар рукой
    specialAbility() {
        console.log(`${this.name} наносит удар!`);
    }
}
