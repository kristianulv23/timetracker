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
    if (time === 0) return '00:00:00';
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 3600 % 60);

    var hDisplay = h > 9 ? h : `0${h}`;
    var mDisplay = m > 9 ? m : `0${m}`;
    var sDisplay = s > 9 ? s : `0${s}`;
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
}

export function snapshotToArray(snapshot) {
    let array = [];
    snapshot.forEach(element => {
        if (element) {
            Object.keys(element).map((e) => {
                array.push(element[e])
            })
        }
    });
    return array;
};