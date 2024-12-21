import { Staff } from './Staff.js';

/**
 * Класс StormStaff представляет посох бури, наследующий свойства от класса Staff.
 */
export class StormStaff extends Staff {
    /**
     * Создает экземпляр посоха бури.
     * @param {string} name - Название.
     * @param {number} attack - Уровень атаки.
     * @param {number} range - Дальность действия.
     */
    constructor(
        name = 'Посох Бури',
        attack = 10,
        range = 3
    ) {
        // Проверка входных параметров
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Имя должно быть непустой строкой.');
        }
        if (typeof attack !== 'number' || attack <= 0) {
            throw new Error('Атака должна быть положительным числом.');
        }
        if (typeof range !== 'number' || range < 0) {
            throw new Error('Дальность должна быть неотрицательным числом.');
        }

        super(name, attack, undefined, range); // Передаем параметры в родительский класс
    }

    // Применяет способность посоха бури.
    specialAbility() {
        console.log(`${this.name} вызывает бурю!`);
    }
}
