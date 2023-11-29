export const keys = (teammemberId: string) => {
    return {
        ALL: 'teammember:all',
        SINGLE: `teammember:${teammemberId}`,
        UPDATE: `teammember:${teammemberId}`,
        DELETE: `teammember:${teammemberId}`,
        CREATE: `teammember:${teammemberId}`,
    }
}
