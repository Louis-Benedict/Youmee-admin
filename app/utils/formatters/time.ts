export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const formattedSeconds = Math.round(seconds - minutes * 60)
    const paddedFormattedSeconds = formattedSeconds.toString().padStart(2, '0')
    return `${minutes}:${paddedFormattedSeconds}`
}
