declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.json' {
    const content: Record<Array, Array>;
    export default content;
}