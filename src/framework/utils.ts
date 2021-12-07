/**
 * Avoid "can't access property of undefined" errors in a more readable way.
 * @param fn Function that wraps a nested property access
 * @param defaultVal Optional - the value to return if property access failed
 */
 export function getSafe<T>(fn: () => T, defaultVal?: T): T | undefined {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}
