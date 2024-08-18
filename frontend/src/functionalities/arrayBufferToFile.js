function arrayBufferToFile(arrayBuffer, fileName) {
    const blob = new Blob([arrayBuffer])
    return new File([blob], fileName)
}

export default arrayBufferToFile