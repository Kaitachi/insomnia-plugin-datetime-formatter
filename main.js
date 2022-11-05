const moment = require('moment');

/**
* Example template tag that generates a random number
* between a user-provided MIN and MAX
*/
module.exports.templateTags = [{
    name: 'randomInteger',
    displayName: 'Random Integer',
    description: 'Generate a random integer.',
    args: [
        {
            displayName: 'Minimum',
            description: 'Minimum potential value',
            type: 'number',
            defaultValue: 0
        },
        {
            displayName: 'Maximum',
            description: 'Maximum potential value',
            type: 'number',
            defaultValue: 100
        }
    ],
    async run (context, min, max) {
        return Math.round(min + Math.random() * (max - min));
    }
},
{
    name: 'customDateTime',
    displayName: 'Custom Date',
    description: 'Generate a custom date time',
    args: [
        {
            displayName: 'Date to be formatted',
            type: 'string',
            defaultValue: '2022-01-01'
        },
        {
            displayName: 'Input format',
            type: 'enum',
            options: [
                { displayName: 'ISO-8601', value: 'iso-8601' },
                { displayName: 'Milliseconds', value: 'millis' },
                { displayName: 'Unix', value: 'unix' },
                { displayName: 'Custom Format', value: 'custom' },
            ]
        },
        {
            help: 'moment.js format string',
            displayName: 'Custom Format Template',
            type: 'string',
            placeholder: 'MMMM Do YYYY, h:mm:ss a',
            hide: args => args[1].value !== 'custom',
        },
        {
            displayName: 'Output Format',
            type: 'enum',
            options: [
                { displayName: 'ISO-8601', value: 'iso-8601' },
                { displayName: 'Milliseconds', value: 'millis' },
                { displayName: 'Unix', value: 'unix' },
                { displayName: 'Custom Format', value: 'custom' },
            ]
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
        console.info({
            inputDate,
            inputDateType,
            inputFormatStr,
            outputDateType,
            outputFormatStr
        });


        if (typeof inputDateType === 'string') {
            inputDateType = inputDateType.toLowerCase();
        }

        if (typeof outputDateType === 'string') {
            outputDateType = outputDateType.toLowerCase();
        }


        let date;

        switch (inputDateType) {
            case 'millis':
            case 'ms':
                //date =
                //return now.getTime() + '';

            case 'unix':
            case 'seconds':
            case 's':
                return Math.round(now.getTime() / 1000) + '';

            case 'iso-8601':
                //return now.toISOString();
                date = moment(inputDate, inputDateType);
                break;

            case 'custom':
                return moment(now).format(inputFormatStr);

            default:
                throw new Error(`Invalid date type "${inputDateType}"`);
        }

        console.warn(date);
        //return date;

        const now = new Date();

        switch (inputDateType) {
            case 'millis':
            case 'ms':
                return now.getTime() + '';
            case 'unix':
            case 'seconds':
            case 's':
                return Math.round(now.getTime() / 1000) + '';
            case 'iso-8601':
                return now.toISOString();
            case 'custom':
                return moment(now).format(inputFormatStr);
            default:
                throw new Error(`Invalid date type "${inputDateType}"`);
        }
    }
}];
