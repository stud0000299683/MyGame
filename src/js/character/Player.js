import { Arm } from '../weapons/Arm.js';

/**
 * Класс Player представляет игрока в игре с различными характеристиками и действиями.
 */
export class Player {
    constructor(position, name, logger = () => {}) {
        this.name = name;         // Имя игрока
        this.position = position; //Позиция игрока на игровом поле
        this.life = 100;          // Жизнь игрока
        this.initialLife = 100;   // Кол-о жизни в начале игры
        this.magic = 20;          // Магия игрока
        this.initialMagic = 20;   // Магия в начале игры
        this.speed = 1;           // Скорость игрока
        this.attack = 10;         // Сила атаки игрока
        this.agility = 5;         // Ловкость игрока
        this.luck = 10;           // Удача игрока
        this.weapons = [];        // Список оружия игрока
        this.startWeapon = new Arm(); //Оружие на старте игры
        this.log = logger;        // Ф-ия логирования
    }

    /**
     * Метод получает текущее оружие игрока.
     * Если все оружее сломано, то возвращает начальное оружие.
     */
    get weapon() {
        for (let currentWeapon of this.weapons) {
            if (!currentWeapon.isBroken()) return currentWeapon; // Возвращаем первое не сломанное оружие
        }
        return this.startWeapon; // Возвращаем начальное оружие, если нет других не сломанных
    }

    /**
     * Генерирует значение удачи игрока.
     * @returns {number} - Значение удачи.
     */
    getLuck() {
        return (Math.random() * 100 + this.luck) / 100;
    }

    /**
     * Вычисляет урон в зависимости от расстояния до цели.
     * @param {number} distance - Расстояние до цели.
     * @returns {number} - Урон.
     */
    getDamage(distance) {
        if (distance > this.weapon.range) return 0; // Если цель слишком далеко то Damage  не наносим
        return (this.attack + this.weapon.getDamage()) * this.getLuck() / Math.max(distance, 1);
    }

    /**
     * Игрок получает урон.
     * @param {number} damage - Урон, который нужно получить.
     */
    takeDamage(damage) {
        const actualDamage = Math.max(0, damage); // Убедимся что урон не отрицательный
        this.log(`${this.shortInfo} получает урон в ${actualDamage}`, 'blue', './images/sword.png');
        this.life = Math.max(0, this.life - actualDamage);
        if (this.isDead()) this.log(`${this.name} мертв!`);
    }

    /**
     * Проверяет, мертв ли игрок.
     * @returns {boolean} - true, если игрок мертв; иначе false.
     */
    isDead() {
        return this.life <= 0;
    }

    /**
     * Перемещает игрока на указанное расстояние.
     * Положительное значение перемещения означает движение вправо, отрицательное - влево.
     * @param {number} distance - Расстояние для движения.
     */
    move(distance) {
      const actualDistance = Math.min(this.speed, Math.abs(distance)); // Определяем фактическое расстояние

      if (distance > 0) {
          this.position += actualDistance; // Двигаем вправо
          this.log(`${this.name} переместился вправо на ${actualDistance}.`, 'blue', './images/change.png');
      } else if (distance < 0) {
          this.position -= actualDistance; // Двигаем влево
          this.log(`${this.name} переместился влево на ${actualDistance}.`, 'blue', './images/change.png');
      }
    }

    /**
     * Проверяет, заблокирована ли атака игрока.
     * @returns {boolean} - true, если атака заблокирована; иначе false.
     */
    isAttackBlocked() {
        return this.getLuck() > (100 - this.luck) / 100;
    }

    /**
     * Проверяет, уклонился ли игрок от атаки.
     * @returns {boolean} - true, если уклонился; иначе false.
     */
    dodged() {
        return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
    }

    /**
     * Обрабатывает получение атаки от врага.
     * @param {number} damage - Урон от атаки врага.
     */
    takeAttack(damage) {
        this.log(`${this.shortInfo} получает удар силой ${damage}`, 'blue', './images/sword.png');
        if (this.isAttackBlocked()) {
            this.log(`${this.shortInfo} блокирует удар`, 'blue', './images/shield.png'); // Логика блокировки удара
            this.weapon.takeDamage(damage); // Уменьшаем прочность оружия при блокировке
            return;
       } else if (!this.dodged()) {
            this.takeDamage(damage); // Если не уклонился и не заблокировал то наносим урон
            return;
       } else {
            this.log(`${this.shortInfo} уклоняется от удара`, 'blue', './images/shield.png'); // Если уклонился то пишем что было уклонение
       }
   }

   /**
    * Пытается атаковать врага.
    * @param {Player} enemy - Враг для атаки.
   **/
   tryAttack(enemy) {
       if (this.isDead()) return; // Проверяем состояние перед атакой
       const distance = Math.abs(this.position - enemy.position);
       if (distance > this.weapon.range) {
           this.log(`${this.shortInfo} недостает до ${enemy.shortInfo}.`); // Если враг слишком далеко то пишем об этом
           return;
       }
       let damage = Math.floor(this.getDamage(distance)); // Вычисляем урон
       if (distance === 0) {
           enemy.move(1); //Если на оба игрока на одной позиции то соперник отскакивает на один ход
           this.log(`${this.shortInfo} соперники слишком близко усиление урона`);
           damage *= 2; // Увеличиваем урон вдвое
       }
       enemy.takeAttack(damage); // Наносим урон врагу
       if (enemy.isDead()) this.log(`${enemy.shortInfo} погиб в бою.`, 'red', './images/death.jpg'); // Если умер, пишем об этом
    } 

    // Выбирает врага из списка игроков для атаки.
    chooseEnemy(players) {
        return players.filter(player => player !== this).reduce((accum, el) => accum === null || el.life < accum.life ? el : accum,null);
    }

    // Перемещает игрока к выбранному врагу.
    moveToEnemy(enemy) {
        const distanceToEnemy = enemy.position - this.position;
        if (distanceToEnemy !== 0) this.move(distanceToEnemy); 
    }

    // Выполняет ход игрока в игре.
    turn(players) {
        if (this.isDead()) return; // Если игрок мертв, пропускаем ход
        const enemy = this.chooseEnemy(players); // Выбираем врага
        if (!enemy) return; // Если нет доступного врага, выходим
        this.log(`${this.name} начинает ход.`);
        this.log(`${this.shortInfo} выбирает ${enemy.shortInfo}.`,'green');
        this.moveToEnemy(enemy); // Перемещаемся к врагу и пытаемся атаковать его
        if (!this.isDead()) this.tryAttack(enemy); // Проверяем состояние после перемещения
        if (!enemy.isDead()) enemy.turn(players);
    }

    // Логирует информацию о состоянии игрока и его жизни.
    logSelf() {
        const description = `${this.name}, жизнь: ${this.life}`;
        console.log(description); 
    }

    // Получает короткую информацию об игроке для логирования или отображения состояния.
    get shortInfo() {
        return `${this.name}, Zone: ${this.position}, Life: ${this.life.toFixed(2)}`;
    }
}
