export class Weapon {
  constructor(name, attack, durability, range) {
      this.name = name;
      this.attack = attack;
      this.durability = durability;
      this.initDurability = durability;
      this.range = range;
  }

  /**
   * Уменьшает прочность оружия на указанное количество урона.
   * @param {number} damage - Количество урона.
   */
  takeDamage(damage) {
      if (damage < 0) {
          console.warn('Урон не может быть отрицательным.');
          return;
      }
      this.durability = Math.max(0, this.durability - damage);
  }

  /**
   * Возвращает текущий урон оружия в зависимости от прочности.
   * @returns {number} - Урон.
   */
  getDamage() {
      if (this.isBroken()) {
          return 0; // Если оружие сломано, урон равен 0
      }
      
      return this.durability >= this.initDurability * 0.3 ? this.attack : this.attack / 2;
  }

  /**
   * Проверяет, сломано ли оружие.
   * @returns {boolean} - true, если оружие сломано; иначе false.
   */
  isBroken() {
      return this.durability === 0;
  }

  /**
   * Возвращает текущее состояние прочности оружия.
   * @returns {number} - Текущая прочность.
   */
  get currentDurability() {
      return this.durability;
  }

  /**
   * Возвращает максимальную прочность оружия.
   * @returns {number} - Максимальная прочность.
   */
  get maxDurability() {
      return this.initDurability;
  }
}
