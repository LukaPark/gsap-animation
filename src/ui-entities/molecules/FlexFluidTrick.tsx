import InputText from '../atoms/input-text.tsx';

export default function FlexFluidTrick() {
    return (
        <div className={'flex gap-5 rounded-xl p-4 border border-black'}>
            <InputText />
            <InputText />
            <button>Submit</button>
        </div>
    );
}
