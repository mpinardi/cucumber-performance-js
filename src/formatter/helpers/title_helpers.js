export function trimFeature({ name}) {
    if (name.endsWith(".feature")) {
        return name.substring(0, name.length - 8);
    }
    return name;
}