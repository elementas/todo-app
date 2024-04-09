const TRUTHFUL_VALUES = ['yes', '1', 'true', 'on'];

exports.checkInt = (value = '', defaultValue = 0) => {
    const parsedValue = parseInt(value, 10);

    return Number.isNaN(parsedValue) ? defaultValue : parsedValue;
};

exports.checkPort = (value = '', defaultValue = 80) => {
    const intValue = exports.checkInt(value, defaultValue);

    return intValue > 0 && intValue <= 65535 ? intValue : defaultValue;
};

exports.checkBoolean = (value = '', defaultValue = false) => {
    if (!value) return defaultValue;
    return TRUTHFUL_VALUES.includes(value.toLowerCase());
};
