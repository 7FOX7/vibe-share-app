function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer)
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; // base64 alphabet
    const bin = n => n.toString(2).padStart(8,0); // convert num to 8-bit binary string
    const len = bytes.length
    let base64 = '';

    for(let i=0; i<=(len-1)/3; i++) {
        let c1 = i*3+1>=len;
        let c2 = i*3+2>=len;
        let chunk = bin(bytes[3*i]) + bin(c1? 0:bytes[3*i+1]) + bin(c2? 0:bytes[3*i+2]);
        let r = chunk.match(/.{1,6}/g).map((x,j)=> j==3&&c2 ? '=' :(j==2&&c1 ? '=':abc[+('0b'+x)]));  
        base64 += r.join('');
    }

    return base64;
}

export default arrayBufferToBase64