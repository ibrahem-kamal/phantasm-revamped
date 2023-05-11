"use strict"

/// Parse arguments from URL hash.
export function argv(hash) {
    if (hash == null) {
        hash = window.location.hash;
    }
    let args = {};
    if (hash.startsWith("#")) {
        for (let arg of hash.substring(1).split("&")) {
            let [key, value] = arg.split("=");
            try {
                key = decodeURIComponent(key);
                args[key] = decodeURIComponent(value);
            } catch (ex) {
                console.error(ex, key, value);
            }
        }
    }
    return args;
}

