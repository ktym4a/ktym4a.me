import type { MarkdownHeading } from 'astro'

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
    backgroundGradient?: string
    hoverBackground?: string
    focusBackground?: string
    outline?: string
    hoverOutline?: string
    focusOutline?: string
    childHoverOutline?: string
    childFocusOutline?: string
    scrollColor?: string
    toCActiveColor?: string
}

export const COLORS: {
    [key in COLOR]: ColorType
} = {
    [COLOR.BLUE]: {
        text: 'text-ctp-blue',
        hoverText: 'hover:text-ctp-blue',
        focusText: 'focus-visible:text-ctp-blue',
        background: 'bg-ctp-blue',
        backgroundGradient: 'to-ctp-blue/30',
        hoverBackground: 'hover:bg-ctp-blue',
        focusBackground: 'focus-visible:bg-ctp-blue',
        outline: 'outline-ctp-blue',
        hoverOutline: 'hover:outline-ctp-blue',
        focusOutline: 'focus-visible:outline-ctp-blue',
        childHoverOutline: '[&>*]:hover:outline-ctp-blue',
        childFocusOutline: '[&>*]:focus-visible:outline-ctp-blue',
        scrollColor: '[&::-webkit-scrollbar-thumb]:bg-ctp-blue/75',
        toCActiveColor: 'group-[.current]:text-ctp-blue'
    },
    [COLOR.GREEN]: {
        text: 'text-ctp-green',
        hoverText: 'hover:text-ctp-green',
        focusText: 'focus-visible:text-ctp-green',
        background: 'bg-ctp-green',
        backgroundGradient: 'to-ctp-green/30',
        hoverBackground: 'hover:bg-ctp-green',
        focusBackground: 'focus-visible:bg-ctp-green',
        outline: 'outline-ctp-green',
        hoverOutline: 'hover:outline-ctp-green',
        focusOutline: 'focus-visible:outline-ctp-green',
        childHoverOutline: '[&>*]:hover:outline-ctp-green',
        childFocusOutline: '[&>*]:focus-visible:outline-ctp-green',
        scrollColor: '[&::-webkit-scrollbar-thumb]:bg-ctp-green/75',
        toCActiveColor: 'group-[.current]:text-ctp-green'
    },
    [COLOR.PEACH]: {
        text: 'text-ctp-peach',
        hoverText: 'hover:text-ctp-peach',
        focusText: 'focus-visible:text-ctp-peach',
        background: 'bg-ctp-peach',
        backgroundGradient: 'to-ctp-peach/30',
        hoverBackground: 'hover:bg-ctp-peach',
        focusBackground: 'focus-visible:bg-ctp-peach',
        outline: 'outline-ctp-peach',
        hoverOutline: 'hover:outline-ctp-peach',
        focusOutline: 'focus-visible:outline-ctp-peach',
        childHoverOutline: '[&>*]:hover:outline-ctp-peach',
        childFocusOutline: '[&>*]:focus-visible:outline-ctp-peach',
        scrollColor: '[&::-webkit-scrollbar-thumb]:bg-ctp-peach/75',
        toCActiveColor: 'group-[.current]:text-ctp-peach'
    },
    [COLOR.PINK]: {
        text: 'text-ctp-pink',
        hoverText: 'hover:text-ctp-pink',
        focusText: 'focus-visible:text-ctp-pink',
        background: 'bg-ctp-pink',
        backgroundGradient: 'to-ctp-pink/30',
        hoverBackground: 'hover:bg-ctp-pink',
        focusBackground: 'focus-visible:bg-ctp-pink',
        outline: 'outline-ctp-pink',
        hoverOutline: 'hover:outline-ctp-pink',
        focusOutline: 'focus-visible:outline-ctp-pink',
        childHoverOutline: '[&>*]:hover:outline-ctp-pink',
        childFocusOutline: '[&>*]:focus-visible:outline-ctp-pink',
        scrollColor: '[&::-webkit-scrollbar-thumb]:bg-ctp-pink/75',
        toCActiveColor: 'group-[.current]:text-ctp-pink'
    }
}

export type ToCType = Array<
    MarkdownHeading & {
        children: ToCType
    }
>
