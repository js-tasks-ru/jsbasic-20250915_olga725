let calculator = {
  num1: 3,
  num2: 5,
  read: function(num1,num2) {
    calculator.num1 = num1;
    calculator.num2 = num2;
  },
  sum: function() {
    return calculator.num1 + calculator.num2;
  },
  mul: function() {
    return calculator.num1 * calculator.num2;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
