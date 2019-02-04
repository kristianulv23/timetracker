import { ITasks } from "../src/components/Table/Table";

export function classNames(...args: string[]) {
    const classes = [];

    for (let i = 0; i < args.length; i++) {
        const arg: any = args[i];
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
                if (arg.hasOwn.call(arg, key) && arg[key]) {
                    classes.push((this && this[key]) || key);
                }
            }
        }
    }
    return classes.join(' ');
}

export function convertToHHMMSS(time: number) {
    if (time === 0) return '00:00:00';
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 3600 % 60);

    var hDisplay = h > 9 ? h : `0${h}`;
    var mDisplay = m > 9 ? m : `0${m}`;
    var sDisplay = s > 9 ? s : `0${s}`;
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
}

export function snapshotToArray(snapshot: ITasks[]) {
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

export function getFirebaseErrorMessage(code: string) {
    let message = '';
    switch (code) {
        case "auth/email-already-in-use":
            message = 'E-postadressen er allerede i bruk av en annen konto.';
            break;
        case "auth/weak-password":
            message = 'Passord må bestå av minst 6 tegn.'
            break;
        case "auth/invalid-email":
            message = 'Kontroller at epostadressen har riktig format.'
            break;
        case "auth/wrong-password":
            message = 'Passordet er ugyldig.'
            break;
        default:
            break;
    }
    return message;
}

export function convertHHMMSSToSeconds(time: string) {
    // your input string
    var a = time.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    return(+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}