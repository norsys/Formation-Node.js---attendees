export function normalizeFlags(settings){
    const copy = {...settings}
    return {
        name: copy.name.trim(),
        retries: copy.retries || 3,
        timeoutMs: copy.timeoutMs ?? 1000
    }
}