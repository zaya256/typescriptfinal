#!/usr/bin/env node

// setup Jasmine
const Jasmine = require('jasmine');
const jasmine = new Jasmine();
jasmine.loadConfig({
    spec_dir: 'dist/helper/e2e',
    spec_files: ['**/*[sS]pec.js'],
    random: false,
    seed: null,
    stopSpecOnExpectationFailure: false
});
jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

// setup console reporter
const JasmineConsoleReporter = require('jasmine-console-reporter');
const reporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 3,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: false
});

// initialize and execute
jasmine.env.clearReporters();
jasmine.addReporter(reporter);
jasmine.execute();
//"test": "tsc && jasmine dist/grader/e2e/**.spec.js"