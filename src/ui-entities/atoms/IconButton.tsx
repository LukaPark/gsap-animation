import { ButtonSize, ColorSystemType } from '../../shared/ui-types.ts';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
    image_url: string;
    size: ButtonSize;
    color: ColorSystemType;
    alt?: string;
    children?: ReactNode;
}

export default function IconButton(props: ButtonProps) {
    const { image_url, size, color, alt = 'img', children = null } = props;

    const shared_style = 'text-white flex items-center justify-center w-fit';

    const style_by_size: {
        [key in ButtonSize]: string;
    } = {
        small: 'p-2 h-8 rounded-md text-[14px] gap-1',
        medium: 'p-3 h-11 rounded-md  text-[14px] gap-2',
        large: 'p-[14px] h-[52px] rounded-md  text-[16px] gap-2',
    };

    const style_by_color: {
        [key in ColorSystemType]: string;
    } = {
        primary: 'bg-primary',
    };

    const icon_shard_style = 'object-cover';

    const icon_style_by_size: {
        [key in ButtonSize]: string;
    } = {
        small: 'w-4 h-4',
        medium: 'w-5 h-5',
        large: 'w-6 h-6',
    };

    return (
        <button className={clsx('', shared_style, style_by_size[size], style_by_color[color])}>
            <img src={image_url} alt={alt} className={clsx(icon_shard_style, icon_style_by_size[size])} />
            {children && children}
        </button>
    );
}
