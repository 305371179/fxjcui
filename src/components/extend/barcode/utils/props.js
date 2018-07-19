export default {
    value: {
        type: [String, Number],
        default: ''
    },
    format: {
        type: String,
        default: 'CODE128'
    },
    width: {
        type: [String, Number],
        default: 2
    },
    height: {
        type: [String, Number],
        default: 100
    },
    text: {
        type: String,
        default: undefined
    },
    fontOptions: {
        type: String,
        default: ''
    },
    font: {
        type: String,
        default: 'monospace'
    },
    textAlign: {
        type: String,
        default: 'center'
    },
    textPosition: {
        type: String,
        default: 'bottom'
    },
    textMargin: {
        type: [String, Number],
        default: 2
    },
    fontSize: {
        type: [String, Number],
        default: 20
    },
    background: {
        type: String,
        default: '#ffffff'
    },
    lineColor: {
        type: String,
        default: '#000000'
    },
    margin: {
        type: [String, Number],
        default: undefined
    },
    marginTop: {
        type: [String, Number],
        default: undefined
    },
    marginBottom: {
        type: [String, Number],
        default: undefined
    },
    marginLeft: {
        type: [String, Number],
        default: undefined
    },
    marginRight: {
        type: [String, Number],
        default: undefined
    },
    displayValue: {
        type: [String, Boolean],
        default: true
    }
}
