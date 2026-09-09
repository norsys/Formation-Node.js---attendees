/**
 * 
 */
export function formatUserLabel(user) {
    const id = user.id ?? "unknown";
    const score = user.profile?.stats?.score ?? 0;
    const role = user.role ?? "member";
    const {firstName, lastName} = user.profile;
    return `${firstName} ${lastName} (#${id}) - ${role} [score=${score}]`;
}