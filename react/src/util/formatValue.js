// display rounding
const formatValue = (formatValue) => {
  const _valueToStr = formatValue.toString();

  if (_valueToStr.indexOf('.') === -1) {
    return formatValue;
  } else {
    if (_valueToStr) {
      const _decimal = _valueToStr.substr(_valueToStr.indexOf('.') + 1, _valueToStr.length);
      let newVal = _valueToStr.substr(0, _valueToStr.indexOf('.') + 1);

      for (let i = 0; i < _decimal.length; i++) {
        newVal = newVal + _decimal[i];

        if (_decimal[i] !== '0') {
          break;
        }
      }

      return newVal;
    }
  }
}

export default formatValue;