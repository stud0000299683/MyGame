import { Bow } from './Bow.js';

/**
 * Класс LongBow представляет длинный лук, наследующий свойства от класса Bow.
 */
export class LongBow extends Bow {
    /**
     * Создает экземпляр длинного лука.
     * @param {string} name - Название.
     * @param {number} attack - Уровень атаки.
     * @param {number} range - Дальность действия.
     */
    constructor(
        name = 'Длинный лук',
        attack = 15,
        range = 4
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

    // Применяет способность длинного лука.
    specialAbility() {
        console.log(`${this.name} стреляет стрелой на большое расстояние!`);
    }
}
