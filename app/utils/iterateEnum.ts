export function iterateEnum(input_enum: any, value: any): any {
    for (let entry of Object.values(input_enum)) {
        if (entry === value) {
            return true
        }
    }
    return false
}
