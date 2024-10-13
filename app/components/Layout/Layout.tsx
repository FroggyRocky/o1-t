import {Header} from "./Header";
import {Footer} from "./Footer";
type Props = {
children: React.ReactNode;
contentPosition?: 'center' | 'start' | 'end';
};

export function Layout(props: Props) {
    return <div className={'flex flex-col h-full'}>
        <Header />
        <div className={`flex-grow w-full flex flex-col items-center ${props.contentPosition ? `justify-${props.contentPosition}` : 'justify-center'} flex-shrink-0 px-5 py-10`}>
        {props.children}
        </div>
        <Footer />
    </div>
};