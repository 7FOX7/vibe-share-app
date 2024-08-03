function shiftValues(values) {
    const copy = values; 
    const firstValue = copy.shift(); 
    copy.push(firstValue); 
    return copy; 
}

export default shiftValues