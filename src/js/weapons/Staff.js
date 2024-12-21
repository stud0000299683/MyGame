import { Weapon } from './Weapon.js';

/**
 * Класс Staff представляет посох, наследующий свойства от класса Weapon.
 */
export class Staff extends Weapon {
    /**
     * Создает экземпляр посоха.
     * @param {string} name - Название.
     * @param {number} attack - Уровень атаки.
     * @param {number} durability - Прочность.
     * @param {number} range - Дальность действия.
     */
    constructor(
        name = 'Посох',
        attack = 8,
        durability = 300,
        range = 2
    ) {
        // Проверка входных параметров
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Имя должно быть непустой строкой.');
        }
        if (typeof attack !== 'number' || attack <= 0) {
            throw new Error('Атака должна быть положительным числом.');
        }
        if (typeof durability !== 'number' || durability < 0) {
            throw new Error('Прочность должна быть неотрицательным числом.');
        }
        if (typeof range !== 'number' || range < 0) {
            throw new Error('Дальность должна быть неотрицательным числом.');
        }

        super(name, attack, durability, range); // Передаем параметры в родительский класс
    }

    //Применяет способность посоха.
    specialAbility() {
        console.log(`${this.name} использует свою специальную способность!`);
    }
}
