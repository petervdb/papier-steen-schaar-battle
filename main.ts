function gelijkSpel () {
    for (let index = 0; index < 4; index++) {
        basic.showIcon(IconNames.Confused)
        wapenWeergeven()
    }
}
radio.onReceivedNumberDeprecated(function (receivedNumber) {
    wapenTegenstander = receivedNumber
})
input.onButtonPressed(Button.A, function () {
    wapen = 0
    ready = true
    wapenWeergeven()
})
function win () {
    for (let index = 0; index < 4; index++) {
        basic.showIcon(IconNames.Happy)
        wapenWeergeven()
    }
}
function controleerWinnaar () {
    ready = false
    if (wapen == wapenTegenstander) {
        gelijkSpel()
    } else if (wapen == 0 && wapenTegenstander == 2) {
        win()
    } else if (wapen == 1 && wapenTegenstander == 0) {
        win()
    } else if (wapen == 2 && wapenTegenstander == 1) {
        win()
    } else {
        verlies()
    }
    wapenTegenstander = -1
}
input.onButtonPressed(Button.AB, function () {
    wapen = 2
    ready = true
    wapenWeergeven()
})
function verlies () {
    for (let index = 0; index < 4; index++) {
        basic.showIcon(IconNames.Sad)
        wapenWeergeven()
    }
}
input.onButtonPressed(Button.B, function () {
    wapen = 1
    ready = true
    wapenWeergeven()
})
function wapenWeergeven () {
    if (wapen == 0) {
        basic.showLeds(`
            . . . . .
            . # # # .
            # # # # #
            # # # # #
            . . # # .
            `)
    } else if (wapen == 1) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    }
}
let wapenTegenstander = 0
let wapen = 0
let ready = false
ready = false
wapen = -1
wapenTegenstander = -1
radio.setGroup(146)
basic.forever(function () {
    if (ready == true) {
        basic.showIcon(IconNames.Yes)
        radio.sendNumber(wapen)
        if (wapenTegenstander > -1) {
            controleerWinnaar()
        }
    }
})
