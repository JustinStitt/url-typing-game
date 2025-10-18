const consonants = "bcdfghjklmnpqrstvwxyz";
const vowels = "aeiou";
const common_consonants = "tnrsldhcmfpgwybvkjxqz";
const common_vowels = "eaiouy";

const common = [
    "and", "a", "of", "the", "be", "to", "in", "that", "have", "I",
    "it", "for", "not", "on", "with", "as", "you", "at", "this", "but",
    "by", "from", "or", "like"
];

const roots = [
    "aqua", "auto", "form", "gram", "graph", "photo", "scope", "script", "vis"
];

const roots_as_prefixes = [
    "geo", "bio", "micro", "multi", "pseudo", "techno", "tele"
];

const roots_as_suffixes = [
    "logy", "meter", "morph", "phobia", "phon", "therm", "gamy", "pathy", "trophy"
];

const roots_need_suffix = [
    "aud", "dict", "duct", "fac", "fort", "ject", "mort", "port", "spect",
    "struct", "voc", "chron", "hydr", "phil", "psycho"
];

const prefixes = [
    "anti", "de", "dis", "pre", "re", "sub", "super", "trans", "un"
];

const suffixes = [
    "able", "al", "ed", "er", "ful", "ion", "ive", "less", "ly",
    "ment", "ness", "ous", "y"
];

function generateSmallWord() {
    const templates_4 = [
        ["br", "a", "d"], ["fl", "ai", "d"], ["gr", "o", "n"], ["tr", "a", "p"],
        ["bl", "e", "nd"], ["cr", "i", "sp"], ["dr", "o", "p"], ["sk", "i", "p"],
        ["st", "a", "r"], ["sp", "e", "ll"], ["cl", "a", "mp"], ["fr", "o", "st"]
    ];

    const templates_5 = [
        ["br", "a", "n", "d"], ["fl", "o", "w", "er"], ["gr", "a", "s", "p"],
        ["tr", "u", "s", "t"], ["bl", "a", "s", "t"], ["cr", "a", "f", "t"],
        ["st", "o", "r", "m"], ["sp", "a", "r", "k"], ["cl", "o", "u", "d"]
    ];

    const vowel_sets = ["a", "e", "i", "o", "u", "ai", "ea", "ou"];
    const consonant_sets = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "y", "z"];

    let word;
    if (Math.random() < 0.5) {
        const template = templates_4[Math.floor(Math.random() * templates_4.length)];
        word = template[0] + vowel_sets[Math.floor(Math.random() * vowel_sets.length)] + template[2];
    } else {
        const template = templates_5[Math.floor(Math.random() * templates_5.length)];
        word = template[0] + vowel_sets[Math.floor(Math.random() * vowel_sets.length)] + 
               consonant_sets[Math.floor(Math.random() * consonant_sets.length)] + template[3];
    }

    return word.slice(0, 5);
}

function smoothTransition(prefix, root) {
    if (prefix.match(/[aeiou]$/) && root.match(/^[aeiou]/)) {
        return prefix.slice(0, -1) + root;
    }
    if (prefix.endsWith("i") && root.startsWith("i")) {
        return prefix.slice(0, -1) + root;
    }
    return prefix + root;
}

function buildFlexibleWord() {
    const root = roots[Math.floor(Math.random() * roots.length)];
    const weights = [35, 45, 20];
    const rand = Math.random() * 100;
    
    if (rand < weights[0]) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        return smoothTransition(prefix, root);
    } else if (rand < weights[0] + weights[1]) {
        return root + suffixes[Math.floor(Math.random() * suffixes.length)];
    } else {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        return smoothTransition(prefix, root) + suffixes[Math.floor(Math.random() * suffixes.length)];
    }
}

function buildSuffixRequired() {
    return roots_need_suffix[Math.floor(Math.random() * roots_need_suffix.length)] + 
           suffixes[Math.floor(Math.random() * suffixes.length)];
}

function buildCompoundWord() {
    const prefix_root = roots_as_prefixes[Math.floor(Math.random() * roots_as_prefixes.length)];
    const main_root = roots[Math.floor(Math.random() * roots.length)];
    return smoothTransition(prefix_root, main_root);
}

function generateWord() {
    if (Math.random() < 0.3) {
        return generateSmallWord();
    }

    if (Math.random() < 0.6) {
        return common[Math.floor(Math.random() * common.length)];
    }

    const generators = [buildFlexibleWord, buildSuffixRequired, buildCompoundWord];
    return generators[Math.floor(Math.random() * generators.length)]();
}
