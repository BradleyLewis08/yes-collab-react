import './diversity.scss'

export default function Diversity() {

    const topText = React.useRef()
    const bottomText = React.useRef()

    const isInViewport = (offset = 0) => {
        if (topText) return false;
        const top = topText.getBoundingClientRect().top;
        return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
    }

    return (
        <div>
            <h1 ref={topText} className="title">diverse by nature</h1>
            <h1 ref={bottomText} className="title">inclusive by choice</h1>
        </div>
    );
}
