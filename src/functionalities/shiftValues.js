function shiftValues(values) {
    const firstValue = values.shift(); 
    values.push(firstValue); 
    return values; 
}

export default shiftValues