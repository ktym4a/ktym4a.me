export type PATH = {
    href: string
    name: string
    color: string
    outlineColor: string
}

const SLIDE_FORWARDS_ANIMATION = {
    old: {
        name: 'slideBack',
        duration: '0.3s',
        easing: 'ease-in-out',
        fillMode: 'forwards'
    },
    new: {
        name: 'slide',
        duration: '0.3s',
        easing: 'ease-in-out',
        fillMode: 'backwards'
    }
}

const SLIDE_BACKWARDS_ANIMATION = {
    old: {
        name: 'slideBack',
        duration: '0.3s',
        easing: 'ease-in-out',
        fillMode: 'forwards'
    },
    new: {
        name: 'slide',
        duration: '0.3s',
        easing: 'ease-in-out',
        fillMode: 'backwards'
    }
}

export const MAIN_SLIDE_ANIMATION = {
    forwards: SLIDE_FORWARDS_ANIMATION,
    backwards: SLIDE_BACKWARDS_ANIMATION
}

enum COLOR {
    BLUE = 'BLUE',
    GREEN = 'GREEN',
    PEACH = 'PEACH',
    PINK = 'PINK'
}

export type ColorType = {
    text?: string
    hoverText?: string
    focusText?: string
    background?: string
    hoverBackground?: string
    focusBackground?: string
    outline?: string
    hoverOutline?: string
    focusOutline?: string
}

export const COLORS: {
    [key in COLOR]: ColorType
} = {
    [COLOR.BLUE]: {
        text: 'text-ctp-blue',
        hoverText: 'hover:text-ctp-blue',
        focusText: 'focus-visible:text-ctp-blue',
        background: 'bg-ctp-blue',
        hoverBackground: 'hover:bg-ctp-blue',
        focusBackground: 'focus-visible:bg-ctp-blue',
        outline: 'outline-ctp-blue',
        hoverOutline: 'hover:outline-ctp-blue',
        focusOutline: 'focus-visible:outline-ctp-blue'
    },
    [COLOR.GREEN]: {
        text: 'text-ctp-green',
        hoverText: 'hover:text-ctp-green',
        focusText: 'focus-visible:text-ctp-green',
        background: 'bg-ctp-green',
        hoverBackground: 'hover:bg-ctp-green',
        focusBackground: 'focus-visible:bg-ctp-green',
        outline: 'outline-ctp-green',
        hoverOutline: 'hover:outline-ctp-green',
        focusOutline: 'focus-visible:outline-ctp-green'
    },
    [COLOR.PEACH]: {
        text: 'text-ctp-peach',
        hoverText: 'hover:text-ctp-peach',
        focusText: 'focus-visible:text-ctp-peach',
        background: 'bg-ctp-peach',
        hoverBackground: 'hover:bg-ctp-peach',
        focusBackground: 'focus-visible:bg-ctp-peach',
        outline: 'outline-ctp-peach',
        hoverOutline: 'hover:outline-ctp-peach',
        focusOutline: 'focus-visible:outline-ctp-peach'
    },
    [COLOR.PINK]: {
        text: 'text-ctp-pink',
        hoverText: 'hover:text-ctp-pink',
        focusText: 'focus-visible:text-ctp-pink',
        background: 'bg-ctp-pink',
        hoverBackground: 'hover:bg-ctp-pink',
        focusBackground: 'focus-visible:bg-ctp-pink',
        outline: 'outline-ctp-pink',
        hoverOutline: 'hover:outline-ctp-pink',
        focusOutline: 'focus-visible:outline-ctp-pink'
    }
}
