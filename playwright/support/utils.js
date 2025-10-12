export function generateULID() {
    const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
    const TIME_LENGTH = 10
    const RANDOM_LENGTH = 16

    function encodeTime(now, len) {
        let time = now
        let str = ''
        for (let i = len; i > 0; i--) {
            const mod = time % 32
            str = ENCODING[time % 32] + str
            time = Math.floor(time / 32)
        }
        return str
    }
    function encodeRandom(len) {
        let str = ''
        for (let i = 0; i < len; i++) {
            const rand = Math.floor(Math.random() * 32)
            str += ENCODING[rand]
        }
        return str
    }

    const now = Date.now()
    const timePart = encodeTime(now, TIME_LENGTH)
    const randomPart = encodeRandom(RANDOM_LENGTH)
    return timePart + randomPart
}