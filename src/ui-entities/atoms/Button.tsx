import { ButtonSize, ColorSystemType } from '../../shared/ui-types.ts';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
    children: ReactNode;
    size: ButtonSize;
    color: ColorSystemType;
}

export default function Button(props: ButtonProps) {
    const { children, size, color } = props;

    const shared_style = 'text-white flex items-center justify-center w-fit';

    const style_by_size: {
        [key in ButtonSize]: string;
    } = {
        small: 'px-4 text-[14px] h-8 rounded-md',
        medium: 'px-6 text-[16px] h-11 rounded-md',
        large: 'px-8 text-[16px] h-[52px] rounded-md',
    };

    const style_by_color: {
        [key in ColorSystemType]: string;
    } = {
        primary: 'bg-primary',
    };

    return <button className={clsx('', shared_style, style_by_size[size], style_by_color[color])}>{children}</button>;
}
