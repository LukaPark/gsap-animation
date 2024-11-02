import Button from './atoms/Button.tsx';
import IconButton from './atoms/IconButton.tsx';
import FlexFluidTrick from './molecules/FlexFluidTrick.tsx';

export default function UIEntities() {
    return (
        <div className={'text-center flex flex-col gap-10'}>
            <div>
                <h1>UI Entities Index Page</h1>
                <h4>Let`s use this page to Check components</h4>
            </div>
            <div className={'grid grid-cols-3 gap-5 items-center justify-items-center'}>
                <Button size="small" color="primary">
                    Button
                </Button>
                <IconButton image_url={'/public/vite.svg'} size={'small'} color={'primary'} />
                <IconButton image_url={'/public/vite.svg'} size={'small'} color={'primary'}>
                    Button
                </IconButton>
                <Button size="medium" color="primary">
                    Button
                </Button>
                <IconButton image_url={'/public/vite.svg'} size={'medium'} color={'primary'} />
                <IconButton image_url={'/public/vite.svg'} size={'medium'} color={'primary'}>
                    Button
                </IconButton>
                <Button size="large" color="primary">
                    Button
                </Button>
                <IconButton image_url={'/public/vite.svg'} size={'large'} color={'primary'} />
                <IconButton image_url={'/public/vite.svg'} size={'large'} color={'primary'}>
                    Button
                </IconButton>
            </div>
            <FlexFluidTrick />
        </div>
    );
}
