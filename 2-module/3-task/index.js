let calculator = {
  num1: 0,
  num2: 0,
  read: function(num1,num2) {
    this.num1 = num1;
    this.num2 = num2;
  },
  sum: function() {
    return this.num1 + this.num2;
  },
  mul: function() {
    return this.num1 * this.num2;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
