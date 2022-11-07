const moment = require('moment');

const formatOptions = [
    { displayName: 'ISO-8601', value: 'iso-8601' },
    { displayName: 'Milliseconds', value: 'millis' },
    { displayName: 'Unix', value: 'unix' },
    { displayName: 'Custom Format', value: 'custom' },
];

module.exports.templateTags = [{
    name: 'customDateTime',
    displayName: 'Custom Date',
    description: 'date and time in custom format',
    args: [
        {
            displayName: 'Date to be Formatted',
            type: 'string',
            defaultValue: moment().toISOString()
        },
        {
            displayName: 'Input Format',
            type: 'enum',
            options: formatOptions
        },
        {
            help: 'moment.js format string',
            displayName: 'Custom Input Format Template',
            type: 'string',
            placeholder: 'MMMM Do YYYY, h:mm:ss a',
            hide: args => args[1].value !== 'custom',
        },
        {
            displayName: 'Output Format',
            type: 'enum',
            options: formatOptions
        },
        {
            help: 'moment.js format string',
            displayName: 'Custom Output Format Template',
            type: 'string',
            placeholder: 'MMMM Do YYYY, h:mm:ss a',
            hide: args => args[3].value !== 'custom',
        }
    ],
    run(context, inputDate, inputDateType = 'iso-8601', inputFormatStr = '', outputDateType = 'iso-8601', outputFormatStr = '') {
        let date;

        // Input Date Formatting
        switch (inputDateType.toLowerCase()) {
            case 'millis':
            case 'ms':
                date = moment(Number(inputDate));
                break;

            case 'unix':
            case 'seconds':
            case 's':
                date = moment(Number(inputDate) * 1000);
                break;

            case 'iso-8601':
                date = moment(inputDate, moment.ISO_8601);
                break;

            case 'custom':
                date = moment(inputDate, inputFormatStr);
                break;

            default:
                throw new Error(`Invalid date type "${inputDateType}"`);
        }

        // Output Date Formatting
        switch (outputDateType.toLowerCase()) {
            case 'millis':
            case 'ms':
                return date.valueOf() + '';

            case 'unix':
            case 'seconds':
            case 's':
                return Math.round(date.valueOf() / 1000) + '';

            case 'iso-8601':
                return date.toISOString(true);

            case 'custom':
                return date.format(outputFormatStr);

            default:
                throw new Error(`Invalid date type "${outputDateType}"`);
        }
    },
    liveDisplayName(context) {
        const outputFormat = formatOptions.find(opt => opt.value == context[3].value);
        return `DateTime (${context[0].value}) => ${outputFormat.displayName}`;
    }
}];
