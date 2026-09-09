/**
 * 
 */
export function formatUserLabel(
    {
        id = "unknown", 
        role = "member", 
        profile: {
            firstName, 
            lastName, 
            stats: { score = 0 } = {}
        }
    } = {}) {
    return `${firstName} ${lastName} (#${id}) - ${role} [score=${score}]`;
}