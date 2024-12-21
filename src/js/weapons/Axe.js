import { Sword } from './Sword.js';

/**
 * Класс Axe представляет секиру, наследующую свойства от класса Sword.
 */
export class Axe extends Sword {
    /**
     * Создает экземпляр секиры.
     * @param {string} name - Название.
     * @param {number} attack - Уровень атаки.
     * @param {number} durability - Прочность.
     */
    constructor(
        name = 'Секира',
        attack = 27,
        durability = 800
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

        super(name, attack, durability); // Передаем параметры в родительский класс
    }

     // Применяет способность секиры.
    specialAbility() {
        console.log(`${this.name} наносит мощный удар!`);
    }
}
