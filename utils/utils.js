export function classNames(...args) {
    const classes = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) {
            continue;
        }

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push((this && this[arg]) || arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(this, arg));
        } else if (argType === 'object') {
            for (const key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push((this && this[key]) || key);
                }
            }
        }
    }
    return classes.join(' ');
}

export function convertToHHMMSS(time) {
    if(time === 0) return '0 sekunder';
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " time og " : " timer og ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minutt og " : " minutter og ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sekund" : " sekunder") : "";
    return hDisplay + mDisplay + sDisplay;
}