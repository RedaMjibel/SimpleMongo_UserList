import readline from "readline";
export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
export function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
//# sourceMappingURL=input.js.map