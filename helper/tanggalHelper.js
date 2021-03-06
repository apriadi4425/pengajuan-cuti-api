exports.AngkaToRomawi = (number) => {
    switch (number) {
        case '01': return 'I'
        case '02': return 'II'
        case '03': return 'III'
        case '04': return 'IV'
        case '05': return 'V'
        case '06': return 'VI'
        case '07': return 'VII'
        case '': return 'VIII'
        case '09': return 'IX'
        case '10': return 'X'
        case '11': return 'XI'
        case '12': return 'XII'
        default : return '-'
    }
}
