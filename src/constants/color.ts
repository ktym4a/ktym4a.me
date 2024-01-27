import { COLOR, type ColorType } from '@/types/index'

export const COLORS: {
    [key in COLOR]: ColorType
} = {
    [COLOR.BLUE]: {
        text: 'text-ctp-blue',
        hoverText: 'hover:text-ctp-blue',
        focusText: 'focus-visible:text-ctp-blue',
        background: 'bg-ctp-blue',
        backgroundGradient: 'to-ctp-blue/30 dark:to-ctp-blue/40',
        hoverBackground: 'hover:bg-ctp-blue',
        focusBackground: 'focus-visible:bg-ctp-blue',
        childHoverBackground: '[&>*]:hover:bg-ctp-blue/10',
        childFocusBackground: '[&>*]:focus-visible:bg-ctp-blue/10',
        outline: 'outline-ctp-blue',
        hoverOutline: 'hover:outline-ctp-blue',
        focusOutline: 'focus-visible:outline-ctp-blue',
        childHoverOutline: '[&>*]:hover:outline-ctp-blue/60',
        childFocusOutline: '[&>*]:focus-visible:outline-ctp-blue/60',
        scrollColor: '[&::-webkit-scrollbar-thumb]:bg-ctp-blue/75',
        toCActiveColor: 'group-[.current]:text-ctp-blue',
        blogPostColor:
            '[&>hr]:border-[1px] [&>hr]:border-ctp-blue/50 dark:[&>hr]:border-ctp-blue/75 [&_em]:text-ctp-blue [&_strong]:text-ctp-blue [&_del]:text-ctp-blue [&_a]:text-ctp-blue focus-visible:[&_a]:outline-ctp-blue [&_blockquote]:border-l-ctp-blue [&_dt]:text-ctp-blue [&_pre::-webkit-scrollbar]:w-[6px] [&_pre::-webkit-scrollbar]:h-[4px] [&_pre::-webkit-scrollbar-thumb]:rounded-md [&_pre::-webkit-scrollbar-thumb]:bg-ctp-blue/75 [&_section]:border-ctp-blue/50 dark:[&_section]:border-ctp-blue/75 [&_th]:text-ctp-blue',
        borderColor: 'border-ctp-blue/50'
    },
    [COLOR.GREEN]: {
        text: 'text-ctp-green',
        hoverText: 'hover:text-ctp-green',
        focusText: 'focus-visible:text-ctp-green',
        background: 'bg-ctp-green',
        backgroundGradient: 'to-ctp-green/30 dark:to-ctp-green/40',
        hoverBackground: 'hover:bg-ctp-green',
        focusBackground: 'focus-visible:bg-ctp-green',
        childHoverBackground: '[&>*]:hover:bg-ctp-green/10',
        childFocusBackground: '[&>*]:focus-visible:bg-ctp-green/10',
        outline: 'outline-ctp-green',
        hoverOutline: 'hover:outline-ctp-green',
        focusOutline: 'focus-visible:outline-ctp-green',
        childHoverOutline: '[&>*]:hover:outline-ctp-green/60',
        childFocusOutline: '[&>*]:focus-visible:outline-ctp-green/60',
        scrollColor: '[&::-webkit-scrollbar-thumb]:bg-ctp-green/75',
        toCActiveColor: 'group-[.current]:text-ctp-green',
        blogPostColor:
            '[&>hr]:border-[1px] [&>hr]:border-ctp-green/50 dark:[&>hr]:border-ctp-green/75 [&_em]:text-ctp-green [&_strong]:text-ctp-green [&_del]:text-ctp-green [&_a]:text-ctp-green focus-visible:[&_a]:outline-ctp-green [&_blockquote]:border-l-ctp-green [&_dt]:text-ctp-green [&_pre::-webkit-scrollbar]:w-[6px] [&_pre::-webkit-scrollbar]:h-[4px] [&_pre::-webkit-scrollbar-thumb]:rounded-md [&_pre::-webkit-scrollbar-thumb]:bg-ctp-green/75 [&_section]:border-ctp-green/50 dark:[&_section]:border-ctp-green/75 [&_th]:text-ctp-green',
        borderColor: 'border-ctp-green/50'
    },
    [COLOR.PEACH]: {
        text: 'text-ctp-peach',
        hoverText: 'hover:text-ctp-peach',
        focusText: 'focus-visible:text-ctp-peach',
        background: 'bg-ctp-peach',
        backgroundGradient: 'to-ctp-peach/30 dark:to-ctp-peach/40',
        hoverBackground: 'hover:bg-ctp-peach',
        focusBackground: 'focus-visible:bg-ctp-peach',
        childHoverBackground: '[&>*]:hover:bg-ctp-peach/10',
        childFocusBackground: '[&>*]:focus-visible:bg-ctp-peach/10',
        outline: 'outline-ctp-peach',
        hoverOutline: 'hover:outline-ctp-peach',
        focusOutline: 'focus-visible:outline-ctp-peach',
        childHoverOutline: '[&>*]:hover:outline-ctp-peach/60',
        childFocusOutline: '[&>*]:focus-visible:outline-ctp-peach/60',
        scrollColor: '[&::-webkit-scrollbar-thumb]:bg-ctp-peach/75',
        toCActiveColor: 'group-[.current]:text-ctp-peach',
        blogPostColor:
            '[&>hr]:border-[1px] [&>hr]:border-ctp-peach/50 dark:[&>hr]:border-ctp-peach/75 [&_em]:text-ctp-peach [&_strong]:text-ctp-peach [&_del]:text-ctp-peach [&_a]:text-ctp-peach focus-visible:[&_a]:outline-ctp-peach [&_blockquote]:border-l-ctp-peach [&_dt]:text-ctp-peach [&_pre::-webkit-scrollbar]:w-[6px] [&_pre::-webkit-scrollbar]:h-[4px] [&_pre::-webkit-scrollbar-thumb]:rounded-md [&_pre::-webkit-scrollbar-thumb]:bg-ctp-peach/75 [&_section]:border-ctp-peach/50 dark:[&_section]:border-ctp-peach/75 [&_th]:text-ctp-peach',
        borderColor: 'border-ctp-peach/50'
    },
    [COLOR.PINK]: {
        text: 'text-ctp-pink',
        hoverText: 'hover:text-ctp-pink',
        focusText: 'focus-visible:text-ctp-pink',
        background: 'bg-ctp-pink',
        backgroundGradient: 'to-ctp-pink/30 dark:to-ctp-pink/40',
        hoverBackground: 'hover:bg-ctp-pink',
        focusBackground: 'focus-visible:bg-ctp-pink',
        childHoverBackground: '[&>*]:hover:bg-ctp-pink/10',
        childFocusBackground: '[&>*]:focus-visible:bg-ctp-pink/10',
        outline: 'outline-ctp-pink',
        hoverOutline: 'hover:outline-ctp-pink',
        focusOutline: 'focus-visible:outline-ctp-pink',
        childHoverOutline: '[&>*]:hover:outline-ctp-pink/60',
        childFocusOutline: '[&>*]:focus-visible:outline-ctp-pink/60',
        scrollColor: '[&::-webkit-scrollbar-thumb]:bg-ctp-pink/75',
        toCActiveColor: 'group-[.current]:text-ctp-pink',
        blogPostColor:
            '[&>hr]:border-[1px] [&>hr]:border-ctp-pink/50 dark:[&>hr]:border-ctp-pink/75 [&_em]:text-ctp-pink [&_strong]:text-ctp-pink [&_del]:text-ctp-pink [&_a]:text-ctp-pink focus-visible:[&_a]:outline-ctp-pink [&_blockquote]:border-l-ctp-pink [&_dt]:text-ctp-pink [&_pre::-webkit-scrollbar]:w-[6px] [&_pre::-webkit-scrollbar]:h-[4px] [&_pre::-webkit-scrollbar-thumb]:rounded-md [&_pre::-webkit-scrollbar-thumb]:bg-ctp-pink/75 [&_section]:border-ctp-pink/50 dark:[&_section]:border-ctp-pink/75 [&_th]:text-ctp-pink',
        borderColor: 'border-ctp-pink/50'
    }
}
